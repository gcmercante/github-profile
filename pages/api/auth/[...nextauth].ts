import type { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: Record<string, any>) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }: Record<string, any>) {
      session.accessToken = token.accessToken
      return session
    },
  },
}

export default NextAuth(authOptions)
