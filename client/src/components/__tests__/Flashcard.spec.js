import React from 'react';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../../themes/theme';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import Flashcard from '../Flashcard';

afterEach(cleanup);

const renderComponent = ({ question, theme }) =>
  render(
    <ThemeProvider theme={theme}>
      <Flashcard question={question} />
    </ThemeProvider>
  );

describe('<Flashcard /> spec', () => {
  it('assert it matches snapshot', () => {
    const mockObject = {
      id: '12',
      text: 'What is 2 + 2?',
      answer: '4',
    };
    const { asFragment } = renderComponent({ question: mockObject, theme: lightTheme});

    expect(asFragment()).toMatchSnapshot();
  });

  it('assert it renders question text', () => {
    const mockObject = {
      id: '12',
      text: 'What is 2 + 2?',
      answer: '4',
    };
    const { getByTestId } = renderComponent({ question: mockObject, theme: lightTheme});

    expect(getByTestId('card-text')).toHaveTextContent('What is 2 + 2?');
  });

  it('assert it initially renders a SHOW ALL button', () => {
    const mockObject = {
      id: '12',
      text: 'What is 2 + 2?',
      answer: '4',
    };
    const { getByTestId } = renderComponent({ question: mockObject, theme: lightTheme});
    const buttonElement = getByTestId('card-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('SHOW ANSWER');
  });

  it('assert it displays different text when the button is clicked', async () => {
    const mockObject = {
      id: '12',
      text: 'What is 2 + 2?',
      answer: '4',
    };
    const { getByTestId, findByTestId } = renderComponent({ question: mockObject, theme: lightTheme});

    expect(getByTestId('card-text')).toHaveTextContent('What is 2 + 2?');
    fireEvent.click(getByTestId('card-button'), { button: 0 });

    expect(await findByTestId('card-text')).toHaveTextContent('4');
  });

  it('assert it displays different text when the button is clicked', async () => {
    const mockObject = {
      id: '12',
      text: 'What is 2 + 2?',
      answer: '4',
    };
    const { getByTestId, findByTestId } = renderComponent({ question: mockObject, theme: lightTheme});
    const buttonElement = getByTestId('card-button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('SHOW ANSWER');

    fireEvent.click(buttonElement, { button: 0 });

    expect(await findByTestId('card-button')).toBeInTheDocument();
    expect(await findByTestId('card-button')).toHaveTextContent('SHOW QUESTION');
  });
});