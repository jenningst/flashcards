import React from 'react';
// import renderer from 'react-test-renderer';

import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';

import ComposeFlashcard from '../ComposeFlashcard';

beforeEach(() => {
});

afterEach(cleanup);

const renderComponent = ({ 
  handleTextChange,
  handleAnswerChange ,
  questionText,
  questionAnswer
}) =>
  render(
    <ComposeFlashcard
      handleTextChange={handleTextChange}
      handleAnswerChange={handleAnswerChange}
      questionText={questionText}
      questionAnswer={questionAnswer}
    />
  );

describe('<ComposeFlashcard /> spec', () => {
  it.todo('assert component matches snapshot');

  it('assert initially renders an empty question text textarea', () => {
    // given: the component has initially rendered
    // when: it mounts
    // then: the user should see an empty text area for the question text
    const textChange = jest.fn();
    const answerChange = jest.fn();
    const { getByTestId } = renderComponent({
      handleTextChange: textChange,
      handleAnswerChange: answerChange,
      questionText: '',
      questionAnswer: '',
    });

    expect(getByTestId('question-text')).toHaveValue('');
  });

  it('assert a toggle button is initially rendered with SHOW ANSWER', () => {
    // given: the component has initially rendered
    // when: it mounts
    // then: there should be a toggle button with text 'SHOW ANSWER'
    const textChange = jest.fn();
    const answerChange = jest.fn();
    const { getByText } = renderComponent({
      handleTextChange: textChange,
      handleAnswerChange: answerChange,
      questionText: '',
      questionAnswer: '',
    });

    expect(getByText('SHOW ANSWER')).toBeEnabled();
  });

  it('assert handleTextChange handler is called', async () => {
    // given: the text area after initial render
    // when: a user types into the field
    // then: the handleTextChange handler should be called
    const textSpy = jest.fn();
    const answerSpy = jest.fn();
    const newText = 'What do you call someone with no body and no nose?';
    const mockEvent = { target: { value: newText }};
    const { getByTestId } = renderComponent({
      handleTextChange: textSpy,
      handleAnswerChange: answerSpy,
      questionText: '',
      questionAnswer: '',
    });
    const textAreaElement = getByTestId('question-text');

    fireEvent.change(textAreaElement, mockEvent);

    expect(textSpy).toHaveBeenCalledTimes(1);
  });
  
  it('assert initially renders an empty answer text textarea', async () => {
    // given: the question text area has valid input
    // when: a user toggles to the answer
    // then: the toggle button text should change
    const textSpy = jest.fn();
    const answerSpy = jest.fn();
    const newText = 'Did you know the first French fries weren\'t actually cooked in France?';
    const { getByText, findByTestId } = renderComponent({
      handleTextChange: textSpy,
      handleAnswerChange: answerSpy,
      questionText: newText,
      questionAnswer: '',
    });

    fireEvent.click(getByText(/^show answer$/i), { button: 0 });

    expect(await findByTestId('question-answer')).toHaveValue('');
  });

  it('assert toggle button text changes upon valid input', async () => {
    // given: the question text area has valid input
    // when: a user toggles to the answer
    // then: the toggle button text should change
    const textSpy = jest.fn();
    const answerSpy = jest.fn();
    const newText = 'Did you know the first French fries weren\'t actually cooked in France?';
    const { getByText, findByText } = renderComponent({
      handleTextChange: textSpy,
      handleAnswerChange: answerSpy,
      questionText: newText,
      questionAnswer: '',
    });

    fireEvent.click(getByText(/^show answer$/i), { button: 0 });
    expect(await findByText(/^show question$/i)).toBeEnabled();

  });

  it('assert handleAnswerChange handler is called', async () => {
    // given: the text area after initial render
    // when: a user types into the field
    // then: the handleTextChange handler should be called
    const textSpy = jest.fn();
    const answerSpy = jest.fn();
    const newText = 'What do you call someone with no body and no nose?';
    const newAnswer = 'Nobody knows.'
    const mockEvent = { target: { value: newAnswer }};
    const { getByText, findByTestId } = renderComponent({
      handleTextChange: textSpy,
      handleAnswerChange: answerSpy,
      questionText: newText,
      questionAnswer: '',
    });

    fireEvent.click(getByText(/^show answer$/i), { button: 0 });
    fireEvent.change(await findByTestId('question-answer'), mockEvent);

    expect(answerSpy).toHaveBeenCalledTimes(1);
  });

  it('assert question text persists after toggle', () => {
    // given: the question text and question answer textareas have valid input
    // when: a user toggles from the answer to the question text
    // then: the question text should persist
    const textSpy = jest.fn();
    const answerSpy = jest.fn();
    const newText = 'How do you make holy water?';
    const newAnswer = 'You boil the hell out of it.'
    const { getByText, getByTestId, findByTestId } = renderComponent({
      handleTextChange: textSpy,
      handleAnswerChange: answerSpy,
      questionText: newText,
      questionAnswer: newAnswer,
    });
  });
});