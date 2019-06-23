import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';

import { Title1, Body } from '../components/Elements/Text';
import { MediumButton } from '../components/Elements/Button';

Flashcard.propTypes = {
  text: PropTypes.string.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

function Flashcard({ text, isAnswer, toggle }) {
  const theme = useContext(ThemeContext);
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
      width: 50%;
    }
  `;

  return (
    <FlashcardWrapper className="Flashcard">
      <div className="Flashcard__question">
        <Body className="Flashcard__question-text">
          {text}
        </Body>
      </div>
      <MediumButton
        className="Flashcard__toggle-button" type="button" onClick={toggle}>
        {"Flip"}
      </MediumButton>
    </FlashcardWrapper>
  );
};

export default Flashcard;
