import styled from "styled-components";

export const Header = styled.header`
  height: 16rem;
  background-color: ${props => props.theme.header};
  width: 100%;
`

export const ProfileContainer = styled.div`
  /* height: 100vh; */
`

export const Container = styled.main`
  padding: 0 0.5rem;
  margin: 0 auto;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

interface StyledImageProps {
  url: string;
}

export const StyledImage = styled.div<StyledImageProps>`
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  border-radius: 999px;
  
  background-image: url(${props => props.url});
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
      padding: 0 0.5rem;
      background-color: ${props => props.theme.sub};
      border-radius: 999px;
    }
  }

  margin-bottom: 2rem;
`

export const Button = styled.button`
  border: transparent;
  box-shadow: 0 0 0 2px ${props => props.theme.base};
  background-color: transparent;
  color: ${props => props.theme.base};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 1.5rem;

  cursor: pointer;

  &:hover {
    outline: 0;
    color: ${props => props.theme.sub};
    box-shadow: 0 0 0 2px ${props => props.theme.sub};
  }
`

export const Footer = styled.footer`
  padding: 1rem 0;
  
  div {
    margin: 0 auto;
    max-width: 800px;
    display: flex;
    justify-content: space-between;
  }

  a {
    cursor: pointer;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

export const CardContainer = styled.div`
  margin-bottom: 10rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 1rem;
  row-gap: 2rem;
  width: 100%;
`

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  span {
    color: ${props => props.theme.sub};
  }
`