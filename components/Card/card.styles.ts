import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  gap: 1rem;
  background-color: ${props => props.theme.header};
  border-radius: 6px;
  flex: 1;
  max-width: 392px;
  min-width: 392px;

  header {
    font-size: 1rem;
    font-weight: 700;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
  }

  @media(max-width: 400px) {
    max-width: 270px;
    min-width: 270px;
  }
`

export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  
  div {
    display: flex;
    justify-content: space-between;
    gap: 1rem;

    div {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;

      span {
        display: block;
        align-items: center;
        justify-content: center;
      }
    }
  }
  a {
    display: block;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: ${props => props.theme.base};

    transition: color 0.2s;

    &:hover {
      color: ${props => props.theme.sub};
    }
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

export const RepositoryDescription = styled.div`
  height: 7rem;
  overflow: hidden;
  font-size: 0.875rem;
  color: ${props => props.theme.sub};
`