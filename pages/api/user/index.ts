import { NextApiRequest, NextApiResponse } from 'next'
import { getGithubService } from '../../../utils/auth'

export async function getUserData(token: string) {
  const gitHub = getGithubService(token)

  const { data } = await gitHub.request('GET /users/gcmercante')

  const user = {
    username: data.login,
    avatar: data.avatar_url,
    url: data.html_url,
    name: data.name,
    repositories: data.public_repos,
    followers: data.followers,
  }

  return user
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const token = req.headers!.authorization as string

    const user = await getUserData(token)

    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message })
  }
}
