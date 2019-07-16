import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useKeyPress } from '../hooks/use-key-press';

import { Body } from './elements/Text';
import { PrimaryButton } from './elements/Button';

function Flashcard({ card }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const toggleAnswer = () => setShowAnswer(!showAnswer);
  const spacebarPressed = useKeyPress(32);

  useEffect(() => {
    if (spacebarPressed) {
      console.log('down');
      setShowAnswer(!showAnswer);
    }
  }, [spacebarPressed]);

  return (
    <FlashcardWrapper className="Flashcard">
      <ContentArea className="Flashcard__content ContentArea">
        <Body
          className="ContentArea__text"
          data-testid='card-text'
        >
          {!showAnswer
            ? card.text
            : card.answer
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
  flex-grow: 1;
  
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 800px;
  padding: 1.5rem;
  
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
  box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);
  background: ${props => props.theme.background.secondary};
  color: ${props => props.theme.font.secondary};
`;

const ContentArea = styled.section`
  flex-grow: 1;
  width: 100%;
  margin: 0rem 1.5rem 1.5rem 1.5rem;

  p {
    font-weight: 300;
    font-style: italic;
  }
`;

const ToggleButton = styled(PrimaryButton)`
  min-width: 224px;
  max-width: 500px;
`;

Flashcard.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Flashcard;
