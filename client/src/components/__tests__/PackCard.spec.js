import React from 'react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  render,
} from '@testing-library/react';

import PackCard from '../PackCard';

afterEach(cleanup);

const renderComponent = ({ name, _id, theme }) => 
  render(
    <ThemeProvider theme={theme}>
      <MemoryRouter initialEntries={['/random-page']}>
        <BrowserRouter>
          <PackCard _id={_id} name={name} theme={theme}/>
        </BrowserRouter>
      </MemoryRouter>
    </ThemeProvider>
  );

describe('<PackCard /> spec', () => {
  it('assert component matches snapshot', () => {
    const { asFragment } = renderComponent({ 
      name: 'JavaScript', 
      _id: '1',
      theme: lightTheme });

    expect(asFragment()).toMatchSnapshot();
  });

  it('assert the primary button is rendered', async () => {
    const initialName = 'Vue';
    const _id = '1';
    const { getByTestId } = renderComponent({ 
      name: initialName, 
      _id, 
      theme: lightTheme });

    expect(await getByTestId('card')).toBeInTheDocument();
  });

  it('assert card name is displayed', async () => {
    const initialName = 'JavaScript';
    const _id = '1';
    const theme = lightTheme;
    const { getByText } = renderComponent({ 
      name: initialName, 
      _id, 
      theme: lightTheme });

    expect(await getByText(initialName)).toBeInTheDocument();
  });

  it('assert re-renders with new props', async () => {
    const initialName = 'JavaScript';
    const newName = 'Angular';
    const theme = lightTheme;
    const _id = '1';
    const { getByText, rerender } = renderComponent({ 
      name: initialName, 
      _id, 
      theme: lightTheme });

    expect(await getByText(initialName)).toBeInTheDocument();
    rerender(
      <ThemeProvider theme={lightTheme}>
        <MemoryRouter>
          <PackCard _id={_id} name={newName} theme={theme}/>
        </MemoryRouter>
      </ThemeProvider>
    );
    const newTitle = getByText(newName);

    expect(await newTitle).toBeInTheDocument();
  });
});