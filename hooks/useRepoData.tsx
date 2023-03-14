import { useState } from 'react'
import { Repository } from '../shared/interfaces/Repository'

export function useRepoData(initialState?: Repository[]) {
  const [repoData, setRepoData] = useState<Repository[]>(initialState ?? [])

  function addRepos(repos: Repository[]) {
    setRepoData((prevValue) => [...prevValue, ...repos])
  }

  return { repoData, addRepos }
}
