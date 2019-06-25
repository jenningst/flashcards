import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ThemeContext from '../contexts/themeContext';

import { Body } from '../components/Elements/Text';
import { MediumButton } from '../components/Elements/Button';

ComposeFlashcard.propTypes = {
  text: PropTypes.string.isRequired,
  isAnswer: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};

function ComposeFlashcard({ text, isAnswer, toggle }) {
  const theme = useContext(ThemeContext);
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
    background: ${theme.background.secondary};
    color: ${theme.font.secondary};
  
    .ComposeFlashcard__question {
      flex-grow: 1;
      width: 100%;
      
      .ComposeFlashcard__question-text {
        margin: 0;
      }
    }
  
    .ComposeFlashcard__toggle-button {
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
    <ComposeFlashcardWrapper className="ComposeFlashcard">
      <div className="ComposeFlashcard__question">
        <Body className="ComposeFlashcard__question-text">
          {text}
        </Body>
      </div>
      <MediumButton
        className="ComposeFlashcard__toggle-button" type="button" onClick={toggle}>
        {!isAnswer ? 'SHOW ANSWER' : 'SHOW QUESTION'}
      </MediumButton>
    </ComposeFlashcardWrapper>
  );
};

export default ComposeFlashcard;
