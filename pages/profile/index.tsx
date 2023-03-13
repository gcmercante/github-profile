import { GetServerSidePropsContext } from 'next'
import { getServerSession, Session } from 'next-auth'
import Link from 'next/link'
import { IoLogoGithub } from 'react-icons/io5'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
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

export default function Profile({ userData, repoData }: ProfileProps) {
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

      const userResult = await fetch('http://localhost:3000/api/user')
      const repoResult = await fetch('http://localhost:3000/api/repositories')

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
