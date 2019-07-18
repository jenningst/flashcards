import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  render,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Dashboard from '../Dashboard';
import { AuthProvider } from '../../contexts/auth-context';

const mockAuth = {
  user: {
    uid: '951affbb-af5e-4583-bc4d-e8e419a1e1cc',
    email: 'test@test.com',
  },
  initialising: false,
  error: null,
};

beforeEach(() => { });
afterEach(cleanup);

const renderComponent = ({ theme, auth }) =>
  act(() => {
    render(
      <AuthProvider value={auth}>
        <ThemeProvider theme={theme}>
          <MockedProvider>
            <MemoryRouter>
              <Dashboard />
            </MemoryRouter>
          </MockedProvider>
        </ThemeProvider>
      </AuthProvider>
    );
  })

describe('<Dashboard /> spec', () => {
  it('assert component matches snapshot', () => {
    const { container } = renderComponent({ 
      theme: lightTheme,
      auth: mockAuth,
    });
    expect(container.firstChild).toMatchSnapshot();
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