import React from 'react';
import { withTheme } from 'styled-components';
import { PrimaryButton, SecondaryButton } from '../components/elements/Button';

const ButtonViewer = () => {
  return (
    <div>
      <PrimaryButton disabled>Disabled</PrimaryButton>
      <br></br>
      <hr></hr>
      <PrimaryButton>Primary</PrimaryButton>
    </div>
  );
};

export default withTheme(ButtonViewer);