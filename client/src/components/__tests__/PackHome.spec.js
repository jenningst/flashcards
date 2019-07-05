import React from 'react';
import renderer from 'react-test-renderer';
import { PackProvider } from '../../contexts/packContext';
import { initialState } from '../../reducers/packReducer';
import { MemoryRouter } from 'react-router-dom';

import {
  cleanup,
  render,
} from '@testing-library/react';

import PackHome from '../PackHome';

let mockName;
let mockCards;

beforeEach(() => {
  mockName = 'Random';
  mockCards = [
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
});

afterEach(cleanup);

const renderComponent = ({ name, cards }) =>
  render(
    <PackProvider value={initialState}>
      <MemoryRouter initialEntries={['/', '/create-pack']}>
        <PackHome name={name} cards={cards} />
      </MemoryRouter>
    </PackProvider>
  );

describe('<PackHome /> specs', () => {
  it('assert component matches snapshot', () => {
    const tree = renderer
      .create(
        <PackProvider value={initialState}>
          <MemoryRouter initialEntries={['/', '/create-pack']}>
            <PackHome name={mockName} cards={mockCards} />
          </MemoryRouter>
        </PackProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('assert a pack name is displayed', () => {
    const { getByText } = renderComponent({ name: mockName, cards: mockCards });
    expect(getByText(mockName)).toBeInTheDocument();
  });

  it('assert the correct number of flashcards is displayed', () => {
    const { getByText } = renderComponent({ name: mockName, cards: mockCards });
    const numberOfCards = mockCards.length;
    expect(getByText(/FLASHCARDS/i)).toHaveTextContent(`${numberOfCards} FLASHCARDS`);
  });

  it('assert review button is disabled if no cards in pack', () => {
    const { getByText } = renderComponent({ name: mockName, cards: [] });
    expect(getByText(/begin review/i)).toBeDisabled();
  });

  it('assert review button is enabled if 1 or more cards in pack', () => {
    const { getByText } = renderComponent({ name: mockName, cards: mockCards });
    expect(getByText(/begin review/i)).not.toBeDisabled();
  });

  it('assert compose button is present and enabled', () => {
    const { getByText } = renderComponent({ name: mockName, cards: mockCards });
    expect(getByText(/^compose more cards$/i)).toBeEnabled();
  });

  it.todo('assert clicking `Begin Review` button sends dispatch');

  it.todo('assert clicking `Compose More Cards` button sends dispatch');
});