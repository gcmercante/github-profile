import { Session } from 'next-auth'

export interface GithubSession extends Session {
  accessToken: string
}
