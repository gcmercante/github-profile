import axios from 'axios';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { IoLogoGithub } from 'react-icons/io5';
import { Card } from '../../components/Card';
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
} from '../../components/Profile/profile.styles';
import { Repository } from '../../shared/interfaces/Repository';
import { User } from '../../shared/interfaces/User';

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
  try {
    res.setHeader(
      'Cache-Control',
      'public, s-maxage=10, stale-while-revalidate=59'
    )
    const { data: userData } = await axios.get('http://localhost:3000/api/user');

    const { data: repoData } = await axios.get('http://localhost:3000/api/repositories');

    return {
      props: {
        userData,
        repoData
      }
    }
  } catch (error: any) {
    console.log(error.message)
    throw new Error(error.message);
  }
}