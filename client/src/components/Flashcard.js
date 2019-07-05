import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';

import { Body } from './Elements/Text';
import { MediumButton } from './Elements/Button';

Flashcard.propTypes = {
  question: PropTypes.object.isRequired,
};

function Flashcard({ question }) {
  const theme = useContext(ThemeContext);
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => setShowAnswer(!showAnswer);

  const FlashcardWrapper = styled.div`
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
    background: ${theme.background.secondary};
    color: ${theme.font.secondary};
  
    .Flashcard__question {
      flex-grow: 1;
      width: 100%;
      
      .Flashcard__question-text {
        margin: 0;
      }
    }
  
    .Flashcard__toggle-button {
      background: ${theme.button.default.primary};
      border: 2px solid ${theme.button.default.primary};
      color: ${theme.font.primary};
      outline: none;
      &:hover {
        background: ${theme.button.hover.primary};
        border: 2px solid ${theme.button.hover.primary};
      }
      &:active {
        border: 2px solid ${theme.button.active.primary};
      }
      border-radius: 15px;
      width: 100%;
    }
  `;

  return (
    <FlashcardWrapper className="Flashcard">
      <div className="Flashcard__question">
        <Body 
          data-testid='card-text'
          className="Flashcard__question-text">
          {!showAnswer
            ? question.text
            : question.answer
          }
        </Body>
      </div>
      <MediumButton
        className="Flashcard__toggle-button"
        data-testid="card-button"
        type="button"
        onClick={toggleAnswer}
      >
        {!showAnswer ? 'SHOW ANSWER' : 'SHOW QUESTION'}
      </MediumButton>
    </FlashcardWrapper>
  );
};

export default Flashcard;
