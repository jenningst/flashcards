import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  render,
} from '@testing-library/react';

import Avatar from '../Avatar';

afterEach(cleanup);

const renderComponent = ({ user, theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <Avatar user={user}/>
    </ThemeProvider>
  );

describe('<Avatar /> spec', () => {
  it.todo('assert component matches snapshot');
  it.todo('assert default image displays if no user authenticated');
  
  it('assert user image displays if authenticated', () => {
    const user = {
      id: '1',
      name: 'Troy Jennings',
      profilePhotoUrl: '../assets/user-avatar.image.jpg',
    };
    const { getByTestId } = renderComponent({ user, theme: lightTheme });
    expect(getByTestId('avatar-image')).toBeInTheDocument();
  });
});