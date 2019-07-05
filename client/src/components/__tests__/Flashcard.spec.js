import React from 'react';
import renderer from 'react-test-renderer';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import Flashcard from '../Flashcard';

let mockObject = {};

beforeEach(() => {
  mockObject = {
    id: '12',
    text: 'What is 2 + 2?',
    answer: '4',
  };
})
afterEach(cleanup);

const renderComponent = ({ card }) =>
  render(
    <Flashcard question={card} />
  );

describe('<Flashcard /> spec', () => {
  it('assert it matches snapshot', () => {
    const tree = renderer
      .create(
        <Flashcard question={mockObject} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('assert it renders question text', () => {
    const { getByTestId } = renderComponent({ card: mockObject });

    expect(getByTestId('card-text')).toHaveTextContent('What is 2 + 2?');
  });

  it('assert it initially renders a SHOW ALL button', () => {
    const { getByTestId } = renderComponent({ card: mockObject });
    const buttonElement = getByTestId('card-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('SHOW ANSWER');
  });

  it('assert it displays different text when the button is clicked', async () => {
    const { getByTestId, findByTestId } = renderComponent({ card: mockObject });

    expect(getByTestId('card-text')).toHaveTextContent('What is 2 + 2?');
    fireEvent.click(getByTestId('card-button'), { button: 0 });

    expect(await findByTestId('card-text')).toHaveTextContent('4');
  });

  it('assert it displays different text when the button is clicked', async () => {
    const { getByTestId, findByTestId } = renderComponent({ card: mockObject });
    const buttonElement = getByTestId('card-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('SHOW ANSWER');

    fireEvent.click(buttonElement, { button: 0 });

    expect(await findByTestId('card-button')).toBeInTheDocument();
    expect(await findByTestId('card-button')).toHaveTextContent('SHOW QUESTION');
  });
});