import { NextApiRequest, NextApiResponse } from 'next'
import { buildRepositoriesList } from '../../../helpers/api/repositories-helper'
import { RepositoryFromGit } from '../../../shared/interfaces/Repository'
import { getGithubService } from '../../../utils/auth'

interface RepositoryRequest {
  data: RepositoryFromGit[]
}

export async function getRepoData(token: string) {
  const gitHub = getGithubService(token)

  const { data } = (await gitHub.request(
    'GET /users/gcmercante/repos'
  )) as RepositoryRequest

  const repos = await buildRepositoriesList(data)

  return repos
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.headers!.authorization as string

    const repos = await getRepoData(token)

    return res.status(200).json(repos)
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message })
  }
}
