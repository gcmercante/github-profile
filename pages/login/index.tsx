import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { IoLogoGithub } from 'react-icons/io5'
import Loader from '../../components/Loader'
import { Button, LoadingContainer, LoginContainer } from './login.styles'

export default function Login() {
  const { data: session, status } = useSession()
  const router = useRouter()

  async function handleLogin() {
    await signIn('github')
  }

  if (session) {
    router.push('/profile')
  }

  if (status !== 'unauthenticated') {
    return (
      <LoadingContainer>
        <Loader size={90} progress={30} />
      </LoadingContainer>
    )
  } else {
    return (
      <LoginContainer>
        <h1>GitHub Profile</h1>
        <Button onClick={handleLogin}>
          <IoLogoGithub size={40} />
          Login with GitHub
        </Button>
      </LoginContainer>
    )
  }
}
