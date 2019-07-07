import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import SignUp from '../SignUp';

afterEach(cleanup);

const renderComponent = ({ theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <StaticRouter>
        <SignUp />
      </StaticRouter>
    </ThemeProvider>
  );

describe('<SignUp /> spec', () => {
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

  it('assert it initially renders an empty input for password two', () => {
    const { getByLabelText } = renderComponent({ theme: lightTheme });
    const passwordElement = getByLabelText(/^confirm password$/i);
    expect(passwordElement).toBeInTheDocument();
    expect(passwordElement).toBeEmpty();
  });

  it('assert it initially renders a disabled submit button', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^sign up$/i)).toBeDisabled();
  });

  it('assert it renders an enabled submit button when all inputs have valid values', () => {
    const { getByLabelText, getByText } = renderComponent({ theme: lightTheme });
    const emailElement = getByLabelText(/^email address$/i);
    const passwordOneElement = getByLabelText(/^password$/i);
    const passwordTwoElement = getByLabelText(/^confirm password$/i);
    const mockEmailEvent = { target: { value: 'test@gmail.com' }};
    const mockPasswordEvent = { target: { value: 'ABC123' }};
    fireEvent.change(emailElement, mockEmailEvent);
    fireEvent.change(passwordOneElement, mockPasswordEvent);
    fireEvent.change(passwordTwoElement, mockPasswordEvent);
    expect(getByText(/^sign up$/i)).toBeEnabled();
  });

  it('assert it renders a link to login page', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^already have an account/i)).toBeInTheDocument();
  });

  it('assert link redirects to sign up page', () => {
    const { getByText } = renderComponent({ theme: lightTheme });
    expect(getByText(/^already have an account/i)).toHaveAttribute('href', '/login');
  });
});