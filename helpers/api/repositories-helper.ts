import { RepositoryFromGit } from "../../shared/interfaces/Repository";

export async function buildRepositoriesList(repositories: RepositoryFromGit[]) {
  const builtRepositories = repositories.map(repo => {
    return {
      repositoryName: repo.full_name,
      description: repo.description || '',
      forks: repo.forks || 0,
      stars: repo.stargazers_count || 0,
      watchers: repo.watchers_count || 0,
      url: repo.html_url,
      id: repo.id,
      updatedAt: repo.updated_at
    }
  });

  return builtRepositories.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}