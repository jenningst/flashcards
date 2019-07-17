import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  render,
  cleanup
} from '@testing-library/react';

import FullPageSpinner from '../FullPageSpinner';

const renderComponent = ({ theme, loading }) =>
  render(
    <ThemeProvider theme={theme}>
      <FullPageSpinner loading={loading} />
    </ThemeProvider>
  );

describe('<FullPageSpinner /> spec', () => {
  it.todo('assert component matches snapshot');
  it.todo('assert spinner is rendered');
});