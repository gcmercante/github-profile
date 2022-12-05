import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: "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"
})

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await octokit.request('GET /users/gcmercante');

    const user  = {
      username: data.login,
      avatar: data.avatar_url,
      url: data.html_url,
      name: data.name,
      repositories: data.public_repos,
      followers: data.followers,
    }

    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message });
  }
}