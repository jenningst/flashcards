import styled from 'styled-components';

const ButtonBase = styled.button`
  height: 3em;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
  padding-left: 2em;
  padding-right: 2em;
  outline: none;
  
  background: ${props => props.theme.color.button.primary};
  color: ${props => props.theme.color.main.pureWhite};
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 6px;
  border-bottom: 4px solid ${props => props.theme.color.border.primary};
  box-shadow: 0px 10px 20px -10px rgba(0,0,0,0.25);

  &:hover {
    background: ${props => props.theme.color.button.primaryHover};
  }
  
  &:active {
    outline: none;
    border-bottom-width: 2px;
    transform: translateY(1px);
  }

  &:disabled {
    background: ${props => props.theme.color.button.disabled};
    color: ${props => props.theme.color.font.grey};
    text-decoration: line-through;
    border-bottom-color: ${props => props.theme.color.border.disabled}
  }
`;

const PrimaryButton = styled(ButtonBase)``;
const SecondaryButton = styled(ButtonBase)``;
export const IconButton = styled(ButtonBase)``;

export { PrimaryButton, SecondaryButton };
