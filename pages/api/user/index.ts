import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../../shared/interfaces/User'
import { getGithubService } from '../../../utils/auth'

interface GetUserDataProps {
  token: string
}

export async function getUserData({ token }: GetUserDataProps): Promise<User> {
  const gitHub = getGithubService(token)

  const { data } = await gitHub.request(`GET /user`)

  const user = {
    username: data.login,
    avatar: data.avatar_url,
    url: data.html_url,
    name: data.name ?? data.login,
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

    const user = await getUserData({ token })

    return res.status(200).json(user)
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message })
  }
}
