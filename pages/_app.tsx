import { Gothic_A1 as GothicA1 } from '@next/font/google'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyle } from '../styles/global'
import { defaultTheme } from '../styles/themes/default'

const gothic = GothicA1({
  weight: ['400', '700'],
  subsets: ['latin']
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Component {...pageProps} className={gothic.className} />
    </ThemeProvider>
  )
}
