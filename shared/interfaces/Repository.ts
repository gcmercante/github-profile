export interface RepositoryFromGit {
  full_name: string
  description: string
  forks: number
  stargazers_count: number
  watchers_count: number
  html_url: string
  id: number
  updated_at: Date
}

export interface Repository {
  repositoryName: string;
  description: string;
  forks: number;
  stars: number;
  watchers: number;
  url: string;
  id: number;
  updatedAt: Date;
}