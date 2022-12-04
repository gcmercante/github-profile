import { Card } from "../../components/Card";
import { Container, Header, RepositoryInformation, StyledImage } from "./styles";

export default function Profile() {
  return (
    <div>
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

        <button>Log out</button>

        <div>
          <Card />
        </div>
      </Container>
    </div>
  )
}