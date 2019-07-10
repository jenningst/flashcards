import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  render,
  cleanup
} from '@testing-library/react';

import Loading from '../Loading';

const renderComponent = ({ theme, loading }) =>
  render(
    <ThemeProvider theme={theme}>
      <Loading loading={loading} />
    </ThemeProvider>
  );

describe('<Loading /> spec', () => {
  it.todo('assert component matches snapshot');
  it.todo('assert spinner is rendered');
});