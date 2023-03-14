import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useState } from 'react'
import { GithubSession } from '../shared/interfaces/GithubSession'
import { Repository } from '../shared/interfaces/Repository'
import { User } from '../shared/interfaces/User'

interface UserContextType {
  repositories: Repository[]
  user: User
  addRepos: (repositories: Repository[]) => void
  setAllRepositories: () => void
  setUser: (user: User) => void
}

interface UserProviderProps {
  children: ReactNode
}

type SessionStatus = 'unauthenticated' | 'loading' | 'authenticated'

interface SessionHook {
  data: GithubSession
  status: SessionStatus
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserProviderProps) {
  const { data: session } = useSession() as SessionHook

  const [repositories, setRepositories] = useState<Repository[]>([])
  const [user, setUser] = useState<User>({
    name: '',
    username: '',
    avatar: '',
    url: '',
    repositories: 0,
    followers: 0,
  })

  function addRepos(repositories: Repository[]) {
    setRepositories((prev) => [...prev, ...repositories])
  }

  async function setAllRepositories() {
    if (!session) throw new Error('No session')

    const repoRequest = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/repositories`,
      {
        method: 'POST',
        body: JSON.stringify({
          userName: user.username,
        }),
      }
    )

    const repoData = await repoRequest.json()

    setRepositories((prev) => [...prev, ...repoData])
  }

  return (
    <UserContext.Provider
      value={{ repositories, user, setUser, addRepos, setAllRepositories }}
    >
      {children}
    </UserContext.Provider>
  )
}
