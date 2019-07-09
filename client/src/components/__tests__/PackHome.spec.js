import React from 'react';
import { PackProvider } from '../../contexts/pack-context';
import { initialState } from '../../reducers/pack-reducer';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  render,
} from '@testing-library/react';

import PackHome from '../PackHome';

afterEach(cleanup);

const renderComponent = ({ name, cards, theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <PackProvider value={initialState}>
        <MemoryRouter initialEntries={['/', '/create-pack']}>
          <PackHome name={name} cards={cards} />
        </MemoryRouter>
      </PackProvider>
    </ThemeProvider>
  );

describe('<PackHome /> specs', () => {
  it('assert component matches snapshot', () => {
    const { container } = renderComponent({
      name: 'Random',
      cards: [
        {
          id: '12',
          text: 'What is 2 + 2?',
          answer: '4',
        },
        {
          id: '85',
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      ],
      theme: lightTheme,
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  it('assert a pack name is displayed', () => {
    const mockName = 'Random'
    const { getByText } = renderComponent({
      name: mockName,
      cards: [
        {
          id: '12',
          text: 'What is 2 + 2?',
          answer: '4',
        },
        {
          id: '85',
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      ],
      theme: lightTheme,
    });
    expect(getByText(mockName)).toBeInTheDocument();
  });

  it('assert the correct number of flashcards is displayed', () => {
    const mockCards = [
      {
        id: '12',
        text: 'What is 2 + 2?',
        answer: '4',
      },
      {
        id: '85',
        text: 'What is the capitol of Sweden?',
        answer: 'Stockholm',
      },
    ];
    const { getByText } = renderComponent({
      name: 'Random',
      cards: mockCards,
      theme: lightTheme,
    });
    const numberOfCards = mockCards.length;
    expect(getByText(/flashcard/i)).toHaveTextContent(`${numberOfCards} FLASHCARD`);
  });

  it('assert test button is not visibile if no cards in pack', () => {
    const { queryByTestId } = renderComponent({
      name: 'Random',
      cards: [],
      theme: lightTheme,
    });
    expect(queryByTestId('test-btn')).not.toBeInTheDocument();
  });

  it('assert edit button is not visibile if no cards in pack', () => {
    const { queryByTestId } = renderComponent({
      name: 'Random',
      cards: [],
      theme: lightTheme,
    });
    expect(queryByTestId('edit-btn')).not.toBeInTheDocument();
  });

  it('assert test button is visible if 1 or more cards in pack', () => {
    const { getByText } = renderComponent({
      name: 'Random',
      cards: [
        {
          id: '12',
          text: 'What is 2 + 2?',
          answer: '4',
        },
        {
          id: '85',
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      ],
      theme: lightTheme,
    });
    expect(getByText(/^test$/i)).toBeInTheDocument();
  });

  it('assert edit button is visible if 1 or more cards in pack', () => {
    const { getByText } = renderComponent({
      name: 'Random',
      cards: [
        {
          id: '12',
          text: 'What is 2 + 2?',
          answer: '4',
        },
        {
          id: '85',
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      ],
      theme: lightTheme,
    });
    expect(getByText(/^edit$/i)).toBeInTheDocument();
  });

  it('assert add button is visibile if no cards in pack', () => {
    const { getByText } = renderComponent({
      name: 'Random',
      cards: [],
      theme: lightTheme,
    });
    expect(getByText(/^add$/i)).toBeInTheDocument()
  });

  it('assert add button is visibile if 1 or more cards in pack', () => {
    const { getByText } = renderComponent({
      name: 'Random',
      cards: [
        {
          id: '12',
          text: 'What is 2 + 2?',
          answer: '4',
        },
        {
          id: '85',
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      ],
      theme: lightTheme,
    });
    expect(getByText(/^add$/i)).toBeInTheDocument()
  });

  it.todo('assert clicking `Begin Review` button sends dispatch');
  it.todo('assert clicking `Compose More Cards` button sends dispatch');
});