import Link from 'next/link'
import { MutableRefObject } from 'react'
import { IoLogoGithub } from 'react-icons/io5'
import { useUserData } from '../../hooks/useUserData'
import { User } from '../../shared/interfaces/User'
import { Card } from '../Card'
import { Header } from '../Header'
import Loader from '../Loader'
import {
  CardContainer,
  Container,
  Footer,
  LoadingContainer,
  NameContainer,
  ProfileContainer,
  RepositoryInformation,
  StyledImage,
} from './profile.styles'

interface ProfileProps {
  userData: User
  endOfListRef?: MutableRefObject<HTMLDivElement | null>
  loading?: boolean
}

export function Profile({ userData, endOfListRef, loading }: ProfileProps) {
  const { repositories } = useUserData()
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
            {repositories.map((repo) => (
              <Card key={repo.id} repo={repo} />
            ))}
            <div ref={endOfListRef}></div>
            {loading && (
              <LoadingContainer>
                <Loader progress={25} size={50} hideLabel />
              </LoadingContainer>
            )}
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
