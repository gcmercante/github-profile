import { Gothic_A1 as GothicA1 } from '@next/font/google'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { UserContextProvider } from '../contexts/UserContext'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'

const gothic = GothicA1({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <UserContextProvider>
        <ThemeProvider theme={defaultTheme}>
          <GlobalStyle />
          <Component {...pageProps} className={gothic.className} />
        </ThemeProvider>
      </UserContextProvider>
    </SessionProvider>
  )
}
