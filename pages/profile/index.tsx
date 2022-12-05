import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io5';
import { Card } from '../../components/Card';
import { Repository } from '../../shared/interfaces/Repository';
import { User } from '../../shared/interfaces/User';
import {
  Button,
  CardContainer,
  Container,
  Footer,
  Header,
  NameContainer,
  ProfileContainer,
  RepositoryInformation,
  StyledImage
} from './styles';

interface ProfileProps {
  userData: User;
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
            <div>
              <span>38</span>
              Contributions
            </div>
          </RepositoryInformation>

          <Button>Log out</Button>

          <CardContainer>
            {
              repoData.map(repo => (
                <Card key={repo.id} repo={repo} />
              ))
            }
          </CardContainer>
        </Container>
      </ProfileContainer>
      <Footer>
        <div>
          <span>Designed & built by Gabriel Mercante</span>
          <Link href={userData.url}><IoLogoGithub /></Link>
        </div>
      </Footer>
    </div>
  )
}


export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )

  const userResponse = await fetch('http://localhost:3000/api/user');
  const userData  = await userResponse.json();

  const repoResponse = await fetch('http://localhost:3000/api/repositories');
  const repoData  = await repoResponse.json();

  return {
    props: {
      userData,
      repoData
    }
  }
}