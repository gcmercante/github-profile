import Link from 'next/link';
import { IoGitNetwork, IoLogoGithub, IoPeople, IoStarOutline } from 'react-icons/io5';
import { Repository } from '../../shared/interfaces/Repository';
import { Container, Footer, RepositoryDescription } from "./card.styles";

interface CardProps {
  repo: Repository;
}

export function Card({ repo }: CardProps) {
  return (
    <Container>
      <header>
        {repo.repositoryName}
      </header>
      <RepositoryDescription>
        {repo.description}
      </RepositoryDescription>
      <Footer>
        <div>
          <div>
            <span><IoPeople/></span>
            <span>{repo.watchers}</span>
          </div>
          <div>
            <span><IoStarOutline /></span>
            <span>{repo.stars}</span>
          </div>
          <div>
            <span><IoGitNetwork /></span>
            <span>{repo.forks}</span>
          </div>
        </div>
        <Link href={repo.url}><IoLogoGithub /></Link>
      </Footer>
    </Container>
  )
}