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
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1.5rem;

  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);
  background: ${props => props.theme.color.main.pureWhite};
  color: ${props => props.theme.color.fonts.charleston};
`;

const QuestionTextInput = styled.div`
  flex-grow: 1;
  width: 100%;
  margin-bottom: 1rem;

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: .50rem;
    resize: none;
    font-family: 'Rubik', sans-serif;
    font-size: 15px;
    font-weight: 300;
    line-height: 20px;
    outline: 1px dashed ${props => props.theme.color.fonts.lightGrey};

    :focus {
      background-color: ${props => props.theme.color.fonts.lightGrey};
      outline: 1px dashed ${props => props.theme.color.fonts.charleston};
      border: none;
    }

    ::placeholder {
      color: ${props => props.theme.color.fonts.lightGrey};
      font-family: 'Rubik', sans-serif;
      font-size: 15px;
      font-weight: 300;
      line-height: 20px;
    }
  }
`;

const ToggleButton = styled(PrimaryButton)`
  width: 100%;
  background: ${props => props.theme.color.main.primary};
  border-bottom: 3px solid ${props => props.theme.color.main.primaryHover};
  border-radius: 15px;
  color: ${props => props.theme.color.fonts.pureWhite};
  outline: none;
  box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);

  &:hover {
    background: ${props => props.theme.color.main.primaryHover};
    border-bottom: 3px solid ${props => props.theme.color.main.primary};
  }
  
  &:active {
    background: ${props => props.theme.color.main.secondaryHover};
  }
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

