import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import Login from '../Login';

afterEach(cleanup);

const renderComponent = ({ theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <StaticRouter>
        <Login />
      </StaticRouter>
    </ThemeProvider>
  );

describe('<Login /> spec', () => {
  it('assert component matches snapshot', () => {
    const { asFragment } = renderComponent({ theme: lightTheme });
    expect(asFragment()).toMatchSnapshot();
  });

  it('assert it initially renders an empty input for email', () => {
    const { getByLabelText } = renderComponent({ theme: lightTheme });
    const emailElement = getByLabelText(/^email address$/i);
    expect(emailElement).toBeInTheDocument();
    expect(emailElement).toBeEmpty();
  });

  it('assert it initially renders an empty input for password one', () => {
    const { getByLabelText } = renderComponent({ theme: lightTheme });
    const passwordElement = getByLabelText(/^password$/i);
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement).toBeEmpty();
  });

  it('assert it initially renders a disabled submit button', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^log in$/i)).toBeDisabled();
  });

  it('assert it renders an enabled submit button when all inputs have valid values', () => {
    const { getByLabelText, getByText } = renderComponent({ theme: lightTheme });
    const emailElement = getByLabelText(/^email address$/i);
    const passwordOneElement = getByLabelText(/^password$/i);
    const mockEmailEvent = { target: { value: 'test@gmail.com' }};
    const mockPasswordEvent = { target: { value: 'ABC123' }};
    fireEvent.change(emailElement, mockEmailEvent);
    fireEvent.change(passwordOneElement, mockPasswordEvent);
    expect(getByText(/^log in$/i)).toBeEnabled();
  });

  it('assert it renders a link to login page', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^don't have an account/i)).toBeInTheDocument();
  });

  it('assert link redirects to sign up page', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^don't have an account/i)).toHaveAttribute('href', '/signup');
  });
});