import { GetServerSidePropsContext } from 'next'
import { getServerSession, Session } from 'next-auth'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import Loader from '../../components/Loader'
import {
  CardContainer,
  Container,
  Footer,
  NameContainer,
  ProfileContainer,
  RepositoryInformation,
  StyledImage,
} from '../../components/Profile/profile.styles'
import { Repository } from '../../shared/interfaces/Repository'
import { User } from '../../shared/interfaces/User'
import { redirectToLogin } from '../../utils/auth'
import { authOptions } from '../api/auth/[...nextauth]'

interface ProfileProps {
  userData: User
  repoData: Repository[]
}

export default function Profile({
  userData,
  repoData: initialRepoData,
}: ProfileProps) {
  const [repoData, setRepoData] = useState<Repository[]>(initialRepoData)

  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(false)
  const [noMoreData, setNoMoreData] = useState(false)
  const endOfListRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    async function loadMore() {
      try {
        if (loading) return
        if (noMoreData) return

        setLoading(true)
        setPageNumber((prevPageNumber) => prevPageNumber + 1)

        const response = await fetch(
          `/api/repositories?page=${pageNumber}&per_page=10`
        )

        const newRepoData = await response.json()

        if (!newRepoData.length) {
          setNoMoreData(true)
        }

        setRepoData((prevRepoData) => [...prevRepoData, ...newRepoData])
        setLoading(false)
      } catch (error: any) {
        throw new Error(error)
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0]
        if (firstEntry.isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '200px' }
    )

    if (endOfListRef.current) {
      observer.observe(endOfListRef.current)
    }

    return () => {
      if (endOfListRef.current) {
        observer.unobserve(endOfListRef.current)
      }
    }
  }, [loading, pageNumber, noMoreData])

  return (
    <div>
      <ProfileContainer>
        <Header />
        <Container>
          <StyledImage url={userData.avatar} />

          <NameContainer>
            <strong>{userData.name}</strong>
            <span>{userData.username}</span>
          </NameContainer>

          <RepositoryInformation>
            <div>
              <span>{userData.repositories}</span>
              Repositories
            </div>
            <div>
              <span>{userData.followers}</span>
              Followers
            </div>
          </RepositoryInformation>

          <CardContainer>
            {repoData.map((repo) => (
              <Card key={repo.id} repo={repo} />
            ))}
            <div ref={endOfListRef}></div>
            {loading && <Loader progress={25} size={20} hideLabel />}
          </CardContainer>
        </Container>
      </ProfileContainer>
      <Footer>
        <div>
          <span>Designed & built by Gabriel Mercante</span>
          <Link href={userData.url}>
            <IoLogoGithub />
          </Link>
        </div>
      </Footer>
    </div>
  )
}

interface GithubSession extends Session {
  accessToken: string
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
      req.headers.authorization = session.accessToken

      const userResult = await fetch(`${process.env.BASE_URL}/api/user`)
      const repoResult = await fetch(
        `${process.env.BASE_URL}/api/repositories?page=1&per_page=10`
      )

      const userData = await userResult.json()
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
