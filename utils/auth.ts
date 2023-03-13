import { GetServerSidePropsContext } from 'next'
import { Octokit } from 'octokit'

export function redirectToLogin(context: GetServerSidePropsContext) {
  context.res.writeHead(302, { Location: '/login' })
  context.res.end()
}

export function getGithubService(token: string): Octokit {
  return new Octokit({
    auth: token,
  })
}
