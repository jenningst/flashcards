import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PackProvider } from '../../contexts/packContext';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';
import { seedMockPack } from '../../utilities/test-utils';
import { mockCards } from '../../utilities/__mocks/mock-cards';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import PackCarousel from '../PackCarousel';

afterEach(cleanup);

const renderComponent = ({ theme, mode, filter, cards }) => 
  render(
    <ThemeProvider theme={theme}>
      <PackProvider>
        <MockedProvider addTypename={false}>
          <MemoryRouter initialEntries={['/']}>
            <PackCarousel mode={mode} filter={filter} cards={cards} />
          </MemoryRouter>
        </MockedProvider>
      </PackProvider>
    </ThemeProvider>
  );

describe('<PackCarousel /> spec', () => {
  it('assert component matches snaptshot', () => {
    const mockPack = seedMockPack(mockCards, 5);
    const { asFragment } = renderComponent({ 
      theme: lightTheme,
      mode: mockPack.mode,
      filter: mockPack.filter,
      cards: mockPack.cards, 
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it.todo('assert a cancel button is rendered enabled');
  it.todo('assert a counter is rendered initially at the first index');
  it.todo('assert navigation buttons are rendered');
  it.todo('assert back button is disabled on first card');
  it.todo('assert both buttons enabled when not on first or last card');
  it.todo('assert forward button is disabled on last card');

  describe('REVIEW MODE', () => {
    it.todo('assert the review mode is displayed when mode is REVIEW MODE');
  });
  
  describe('WRITE MODE', () => {
    it.todo('assert the write mode is displayed when mode is WRITE MODE');
    it.todo('assert save button is displayed when mode is WRITE MODE');
    it.todo('asswert save button is initially disabled in WRITE MODE');
    it.todo('assert save button is enabled with valid question and answer input');
  });
});