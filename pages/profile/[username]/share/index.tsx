import { GetStaticPaths, GetStaticProps } from 'next'
import { Profile } from '../../../../components/Profile'
import { Repository } from '../../../../shared/interfaces/Repository'
import { User } from '../../../../shared/interfaces/User'

interface ProfileProps {
  userData: User
  repoData: Repository[]
}

export default function Share({ userData, repoData }: ProfileProps) {
  return <Profile userData={userData} repoData={repoData} />
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps<ProfileProps> = async ({
  params,
}) => {
  const userRequest = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/user`)

  const userData = await userRequest.json()

  const repoRequest = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/repositories`,
    {
      method: 'POST',
      body: JSON.stringify({ userName: userData.username }),
    }
  )

  const repoData = await repoRequest.json()

  return {
    props: {
      repoData,
      userData,
    },
    revalidate: 60 * 60 * 24,
  }
}
