import styled from "styled-components";

export const Header = styled.header`
  height: 16rem;
  background-color: ${props => props.theme.header};
  width: 100%;
`

export const Container = styled.div`
  padding: 0 0.5rem;
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const StyledImage = styled.div`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  border-radius: 999px;
  
  background-image: url("http://github.com/gcmercante.png");
  background-size: cover;

  margin-top: -4rem;
  margin-bottom: 2rem;
`

export const RepositoryInformation = styled.div`
  display: flex;
  gap: 4rem;
  
  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    span {
      display: block;
      margin: 0 auto;
      padding: 0.5rem;
      background-color: ${props => props.theme.sub};
      border-radius: 999px;
    }
  }

  margin-bottom: 2rem;
`