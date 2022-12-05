import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";
import { buildRepositoriesList } from "../../../helpers/api/repositories-helper";
import { RepositoryFromGit } from "../../../shared/interfaces/Repository";

const octokit = new Octokit({
  auth: "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"
})


interface RepositoryRequest {
  data: RepositoryFromGit[]
}

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    const { data } = await octokit.request('GET /users/gcmercante/repos') as RepositoryRequest;

    const repos = await buildRepositoriesList(data);

    return res.status(200).json(repos);
  } catch (error: any) {
    return res.status(error.response.status).json({ message: error.message });
  }
}