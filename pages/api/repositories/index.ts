import { NextApiRequest, NextApiResponse } from 'next'
import { buildRepositoriesList } from '../../../helpers/api/repositories-helper'
import { RepositoryFromGit } from '../../../shared/interfaces/Repository'
import { getGithubService } from '../../../utils/auth'

interface RepositoryRequest {
  data: RepositoryFromGit[]
}

interface GetRepoDataProps {
  token: string
  page: string
  perPage: string
  userName: string
}

export async function getRepoData({
  token,
  page,
  perPage,
  userName,
}: GetRepoDataProps) {
  const gitHub = getGithubService(token)

  const { data } = (await gitHub.request(
    `GET /users/${userName}/repos?page=${page}&per_page=${perPage}`
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
    const { userName, page, perPage } = JSON.parse(req.body)

    const repos = await getRepoData({ page, perPage, userName, token })

    return res.status(200).json(repos)
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message })
  }
}
