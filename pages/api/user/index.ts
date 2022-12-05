import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})


export async function getUserData() {
  const { data } = await octokit.request('GET /users/gcmercante');

  const user  = {
    username: data.login,
    avatar: data.avatar_url,
    url: data.html_url,
    name: data.name,
    repositories: data.public_repos,
    followers: data.followers,
  }

  return user;
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await getUserData();

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message });
  }
}