import styled from 'styled-components';

const InputBase = styled.input`
  box-sizing: border-box;
  width: 100%;
  margin: .50rem;
  padding: .50rem 0rem .50rem 0rem;
  font-family: 'Rubik', sans-serif;
  font-size: 15px;
  font-weight: 300;
  line-height: 20px;
  border-bottom: 2px solid ${props => props.theme.color.border.inputDefault};
  border-left: none;
  border-right: none;
  border-top: none;

  &::placeholder {
    color: ${props => props.theme.color.font.placeholder};
  }

  &:focus {
    border-bottom: 2px solid ${props => props.theme.color.border.secondary};
    outline: none;
  }
`;

export const Input = styled(InputBase)``;