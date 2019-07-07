import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  render,
} from '@testing-library/react';

import Dashboard from '../Dashboard';

beforeEach(() => { });
afterEach(cleanup);

const renderComponent = ({ theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <MockedProvider>
        <MemoryRouter>
          <Dashboard />
        </MemoryRouter>
      </MockedProvider>
    </ThemeProvider>
  );

describe('<Dashboard /> spec', () => {
  it('assert component matches snapshot', () => {
    const { asFragment } = renderComponent({ theme: lightTheme });
    expect(asFragment()).toMatchSnapshot();
  });
  
  it('assert the add collection button renders', () => {
    const { getByTestId } = renderComponent({ theme: lightTheme });
    expect(getByTestId('create-pack-button')).toBeEnabled();
  });

  it.todo('assert a menu icon renders');
  it.todo('assert menu icon handler is called');
  it.todo('assert user avatar renders');
  it.todo('assert user avatar handled is called');

  it.todo('assert can receive packs from gql query');
  it.todo('assert renders PackCards from gql query');
});