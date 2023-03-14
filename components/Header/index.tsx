import { signOut } from 'next-auth/react'
import { useUserData } from '../../hooks/useUserData'
import { Button, HeaderContainer } from './header.styles'

export function Header() {
  const { user } = useUserData()

  const shareUrl = `${process.env.NEXT_PUBLIC_APP_URL}/profile/${user.username}/share`

  function handleLogout() {
    signOut()
  }

  async function handleCopyShareableLink() {
    await navigator.clipboard.writeText(shareUrl)
  }

  return (
    <HeaderContainer>
      <div>
        <Button onClick={handleCopyShareableLink}>Share</Button>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </HeaderContainer>
  )
}
