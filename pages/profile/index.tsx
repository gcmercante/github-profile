import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { useContext, useEffect, useRef, useState } from 'react'
import { Profile } from '../../components/Profile'
import { UserContext } from '../../contexts/UserContext'
import { GithubSession } from '../../shared/interfaces/GithubSession'
import { Repository } from '../../shared/interfaces/Repository'
import { User } from '../../shared/interfaces/User'
import { redirectToLogin } from '../../utils/auth'
import { authOptions } from '../api/auth/[...nextauth]'

interface ProfileProps {
  userData: User
  repoData: Repository[]
}

export default function ProfilePage({
  userData,
  repoData: initialRepoData,
}: ProfileProps) {
  const { addRepos, setUser, repositories } = useContext(UserContext)

  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const [noMoreData, setNoMoreData] = useState(false)

  const endOfListRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    function loadInitialData() {
      setUser(userData)
      addRepos(initialRepoData)
    }

    loadInitialData()
  }, [])

  useEffect(() => {
    async function loadMore() {
      try {
        if (loading) return
        if (noMoreData) return

        setLoading(true)
        setPageNumber((prevPageNumber) => prevPageNumber + 1)

        const response = await fetch(`/api/repositories`, {
          method: 'POST',
          body: JSON.stringify({
            page: pageNumber,
            perPage: '10',
            userName: userData.username,
          }),
        })

        const newRepoData = await response.json()

        if (!newRepoData.length) {
          setNoMoreData(true)
          setLoading(false)
          return
        }

        addRepos(newRepoData)
        setLoading(false)
      } catch (error: any) {
        throw new Error(error)
      }
    }
    const currentEnd = endOfListRef.current

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    if (currentEnd) {
      observer.observe(currentEnd)
    }

    return () => {
      if (currentEnd) {
        observer.unobserve(currentEnd)
      }
    }
  }, [loading, pageNumber, noMoreData, userData.username, addRepos])

  return (
    <Profile
      userData={userData}
      endOfListRef={endOfListRef}
      loading={loading}
      repoData={repositories}
    />
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const { req, res } = context

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )

    const session = (await getServerSession(
      req,
      res,
      authOptions
    )) as GithubSession

    if (session) {
      const userResult = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user`,
        {
          headers: {
            Authorization: 'Bearer ' + session.accessToken,
          },
        }
      )
      const userData: User = await userResult.json()

      const repoResult = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/repositories`,
        {
          method: 'POST',
          body: JSON.stringify({
            page: '1',
            perPage: '10',
            userName: userData.username,
          }),
        }
      )

      const repoData = await repoResult.json()

      return {
        props: {
          userData,
          repoData,
        },
      }
    }

    redirectToLogin(context)

    return { props: {} }
  } catch (error: any) {
    throw new Error(error.message)
  }
}
