import styled from "styled-components";

export const HeaderContainer = styled.header`
  height: 16rem;
  background-color: ${(props) => props.theme.header};
  width: 100%;
  display: flex;
  justify-content: center;

  div {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    justify-content: flex-end;
    max-width: 800px;
    width: 100%;
    padding: 2rem 0.5rem;
  }
`;

export const Button = styled.button`
  border: transparent;
  box-shadow: 0 0 0 2px ${(props) => props.theme.base};
  background-color: transparent;
  color: ${(props) => props.theme.base};
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  margin-bottom: 2rem;
  font-size: 1.25rem;

  cursor: pointer;

  &:hover {
    outline: 0;
    color: ${(props) => props.theme.sub};
    box-shadow: 0 0 0 2px ${(props) => props.theme.sub};
  }
`;
