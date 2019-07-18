import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { PrimaryButton } from './elements/Button';

function ComposeFlashcard({
  handleTextChange,
  handleAnswerChange,
  questionText,
  questionAnswer
}) {
  const [showAnswer, setShowAnswer] = useState(false); 
  const toggleAnswer = () => setShowAnswer(!showAnswer);

    return (
    <ComposeFlashcardWrapper className="ComposeFlashcard">
      <QuestionTextInput className="ComposeFlashcard__input">
        {!showAnswer
          ? <textarea 
              className="ComposeFlashcard__input--text"
              data-testid="question-text"
              onChange={handleTextChange}
              value={questionText}
              placeholder="Type your question here..."
            />
          : <textarea
              className="ComposeFlashcard__input--answer"
              data-testid="question-answer"
              onChange={handleAnswerChange}
              value={questionAnswer}
              placeholder="Type your answer here..."
            />
        }
      </QuestionTextInput>
      <ToggleButton
        className="ComposeFlashcard__button-toggle"
        type="button"
        onClick={toggleAnswer}
      >
        {!showAnswer ? 'SHOW ANSWER' : 'SHOW QUESTION'}
      </ToggleButton>
    </ComposeFlashcardWrapper>
  );
};

const ComposeFlashcardWrapper = styled.div`
  box-sizing: border-box;
  flex-grow: 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 500px;
  padding: 1rem;

  background: ${props => props.theme.color.background.pureWhite};
  border-bottom-left-radius: .50rem;
  border-bottom-right-radius: .50rem;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  color: ${props => props.theme.color.font.charleston};
`;

const QuestionTextInput = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-bottom: 1rem;

  textarea {
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding: .50rem;
    resize: none;
    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 20px;
    outline: 1px dashed ${props => props.theme.color.font.lightGrey};

    :focus {
      background-color: ${props => props.theme.color.font.lightGrey};
      outline: 1px dashed ${props => props.theme.color.font.charleston};
      border: none;
    }

    ::placeholder {
      color: ${props => props.theme.color.font.lightGrey};
      font-family: 'Rubik', sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 20px;
    }
  }
`;

const ToggleButton = styled(PrimaryButton)`
  width: 100%;
`;

ComposeFlashcard.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
  questionText: PropTypes.string,
  questionAnswer: PropTypes.string,
};

ComposeFlashcard.defaultProps = {
  questionText: '',
  questionAnswer: '',
}

export default ComposeFlashcard;

