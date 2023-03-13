import styled from 'styled-components'

export const Button = styled.button`
  border: transparent;
  box-shadow: 0 0 0 2px ${(props) => props.theme.base};
  background-color: transparent;
  color: ${(props) => props.theme.base};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 1.5rem;

  cursor: pointer;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding-right: 1.5rem;

  &:hover {
    outline: 0;
    color: ${(props) => props.theme.sub};
    box-shadow: 0 0 0 2px ${(props) => props.theme.sub};
  }
`
export const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  h1 {
    font-size: 2rem;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  height: 100vh;
`
