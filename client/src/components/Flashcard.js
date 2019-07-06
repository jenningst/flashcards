import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Body } from './Elements/Text';
import { MediumButton } from './Elements/Button';

function Flashcard({ question }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => setShowAnswer(!showAnswer);

  return (
    <FlashcardWrapper className="Flashcard">
      <ContentArea className="Flashcard__content ContentArea">
        <Body
          className="ContentArea__text"
          data-testid='card-text'
        >
          {!showAnswer
            ? question.text
            : question.answer
          }
        </Body>
      </ContentArea>
      <ToggleButton
        className="Flashcard__button-toggle"
        data-testid="card-button"
        type="button"
        onClick={toggleAnswer}
      >
        {!showAnswer ? 'SHOW ANSWER' : 'SHOW QUESTION'}
      </ToggleButton>
    </FlashcardWrapper>
  );
};

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
  background: ${props => props.theme.background.secondary};
  color: ${props => props.theme.font.secondary};
`;

const ContentArea = styled.section`
  flex-grow: 1;
  width: 100%;
`;

const ToggleButton = styled(MediumButton)`
  width: 100%;
  background: ${props => props.theme.button.default.primary};
  border: 2px solid ${props => props.theme.button.default.primary};
  border-radius: 15px;
  color: ${props => props.theme.font.primary};
  outline: none;
  &:hover {
    background: ${props => props.theme.button.hover.primary};
    border: 2px solid ${props => props.theme.button.hover.primary};
  }
  &:active {
    border: 2px solid ${props => props.theme.button.active.primary};
  }
`;

Flashcard.propTypes = {
  question: PropTypes.object.isRequired,
};

export default Flashcard;
