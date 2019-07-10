import styled from 'styled-components';

export const LargeButton = styled.button`
  text-transform: uppercase;
  letter-spacing: .15em;
  font-size: 15px;
  font-weight: 500;
  font-family: 'Rubik', sans-serif;
  padding: 1em;
  border-radius: 8px;
  border: none;
`;

export const MediumButton = styled.button`
  letter-spacing: .10em;
  font-size: 14px;
  font-family: 'Rubik', sans-serif;
  padding: .8em;
  border-radius: 6px;
  border: none;
`;

export const SmallButton = styled.button`
  font-size: .7em;
  font-family: 'Rubik', sans-serif;
  padding: .50em;
  border-radius: 6px;
  border: none;
`;

export default { LargeButton, MediumButton, SmallButton };
