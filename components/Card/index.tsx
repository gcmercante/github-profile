import { IoGitNetwork, IoLogoGithub, IoPeople, IoStarOutline } from 'react-icons/io5';
import { Container, Footer, RepositoryDescription } from "./styles";

export function Card() {
  return (
    <Container>
      <header>
        repository name
      </header>
      <RepositoryDescription>
        repository description
      </RepositoryDescription>
      <Footer>
        <div>
          <div>
            <span><IoPeople/></span>
            <span>1</span>
          </div>
          <div>
            <span><IoStarOutline /></span>
            <span>1</span>
          </div>
          <div>
            <span><IoGitNetwork /></span>
            <span>1</span>
          </div>
        </div>
        <a><IoLogoGithub /></a>
      </Footer>
    </Container>
  )
}