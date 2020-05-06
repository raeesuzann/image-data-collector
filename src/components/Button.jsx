import styled from "styled-components";

export const Button = styled.div`
  border: none;
  border-radius: 7px;
  padding: 0.5rem 1rem;
  background: ${(props) => (props.like ? "green" : "red")};
  color: white;
  &:hover {
    background: white;
    color: ${(props) => (props.like ? "green" : "red")};
    border: 1px solid ${(props) => (props.like ? "green" : "red")};
  }
`;