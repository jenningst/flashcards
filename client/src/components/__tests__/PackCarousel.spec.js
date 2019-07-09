import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PackProvider } from '../../contexts/pack-context';
import { MockedProvider } from 'react-apollo/test-utils';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';
import { seedMockPack } from '../../utilities/test-utils';
import { mockCards } from '../../utilities/__mocks/mock-cards';
import { zeroPad } from '../../utilities/helpers';

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
  it.skip('assert component matches snaptshot', () => {
    const mockPack = seedMockPack(mockCards, 1);
    const { asFragment } = renderComponent({ 
      theme: lightTheme,
      mode: mockPack.mode,
      filter: mockPack.filter,
      cards: mockPack.cards, 
    });
    expect(asFragment()).toMatchSnapshot();
  });

  describe('common functionality', () => {
    let mockPack;
    beforeEach(() => {
      mockPack = seedMockPack(mockCards, mockCards.length); 
    });

    it('assert a close button is rendered enabled', () => {
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockPack.mode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByTestId('button-close')).toBeInTheDocument();
    });
  
    it('assert the current question index is rendered at 001', () => {
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockPack.mode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByTestId('current')).toBeInTheDocument();
      expect(getByTestId('current')).toHaveTextContent('001');
    });

    it('assert a counter is rendered initially at the first index', () => {
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockPack.mode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      const totalQuestions = zeroPad(mockPack.cards.length);
      expect(getByTestId('total')).toBeInTheDocument();
      expect(getByTestId('total')).toHaveTextContent(`\ ${totalQuestions}`);
    });

    it('assert navigation buttons are rendered', () => {
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockPack.mode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByTestId('button-back')).toBeInTheDocument();
      expect(getByTestId('button-forward')).toBeInTheDocument();
    });

    it.skip('assert back button is disabled on first card', () => {
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockPack.mode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByTestId('button-back')).toHaveClass('pointer-events', 'none');
    });

    it.todo('assert both buttons enabled when not on first or last card');
    it.todo('assert forward button is disabled on last card');

    it('assert the review mode is displayed when mode is REVIEW MODE', () => {
      const mockMode = 'REVIEW_MODE';
      const prettyMockMode = mockMode.replace('_', ' ');
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockMode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByTestId('mode')).toHaveTextContent(prettyMockMode);
    });

    it('assert the write mode is displayed when mode is WRITE MODE', () => {
      const mockMode = 'WRITE_MODE';
      const prettyMockMode = mockMode.replace('_', ' ');
      const { getByTestId } = renderComponent({ 
        theme: lightTheme,
        mode: mockMode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByTestId('mode')).toHaveTextContent(prettyMockMode);
    });

    it('assert save button is displayed disabled when mode is WRITE MODE', () => {
      const mockMode = 'WRITE_MODE';
      const { getByText } = renderComponent({ 
        theme: lightTheme,
        mode: mockMode,
        filter: mockPack.filter,
        cards: mockPack.cards, 
      });
      expect(getByText(/^save card$/i)).toBeInTheDocument();
      expect(getByText(/^save card$/i)).toBeDisabled();
    });
  });
});