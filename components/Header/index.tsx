import { signOut } from 'next-auth/react'
import { Button, HeaderContainer } from './header.styles'

export function Header() {
  function handleLogout() {
    signOut({ callbackUrl: `${process.env.BASE_URL}/login` })
  }
  return (
    <HeaderContainer>
      <div>
        <Button>Share</Button>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </HeaderContainer>
  )
}
