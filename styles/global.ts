import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    line-height: 160%;
  }

  body {
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.base};
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font: 400 1rem 'Gothic A1', sans-serif;
  }

  svg {
    max-width: 100%;
    vertical-align: middle;
  }
`
