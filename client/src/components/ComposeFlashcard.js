import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MediumButton } from './Elements/Button';

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
            />
          : <textarea
              className="ComposeFlashcard__input--answer"
              data-testid="question-answer"
              onChange={handleAnswerChange}
              value={questionAnswer}
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

  border-radius: 20px;
  margin-left: 1rem;
  margin-right: 1rem;
  padding: 1.5rem 1rem 1rem 1rem;
  background: red;
  color: ${props => props.theme.font.secondary};
`;

const QuestionTextInput = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const ToggleButton = styled(MediumButton)`
  background: ${props => props.theme.button.default.primary};
  border: 2px solid ${props => props.theme.button.default.primary};
  color: ${props => props.theme.font.primary};
  outline: none;
  border-radius: 15px;
  width: 100%;
  &:hover {
    background: ${props => props.theme.button.hover.primary};
    border: 2px solid ${props => props.theme.button.hover.primary};
  }
  &:active {
    border: 2px solid ${props => props.theme.button.active.primary};
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

