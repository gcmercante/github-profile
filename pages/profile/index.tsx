import { Card } from '../../components/Card'
import {
  Button,
  CardContainer,
  Container,
  Footer,
  Header,
  ProfileContainer,
  RepositoryInformation,
  StyledImage
} from './styles'

export default function Profile() {
  return (
    <div>
      <ProfileContainer>
        <Header />
        <Container>
          <StyledImage />

          <RepositoryInformation>
            <div>
              <span>38</span>
              Repositories
            </div>
            <div>
              <span>38</span>
              Contributions
            </div>
          </RepositoryInformation>

          <Button>Log out</Button>

          <CardContainer>
            <Card />
            <Card />
            <Card />
            <Card />
          </CardContainer>
        </Container>
      </ProfileContainer>
      <Footer>
        <div>
          <span>Designed & built by Gabriel Mercante</span>
          <a>Icon</a>
        </div>
      </Footer>
    </div>
  )
}
