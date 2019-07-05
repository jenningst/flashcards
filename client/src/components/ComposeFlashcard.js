import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MediumButton } from './Elements/Button';

ComposeFlashcard.propTypes = {
  handleTextChange: PropTypes.func.isRequired,
  handleAnswerChange: PropTypes.func.isRequired,
  questionText: PropTypes.string,
  questionAnswer: PropTypes.string,
};

function ComposeFlashcard({
  handleTextChange,
  handleAnswerChange,
  questionText,
  questionAnswer
}) {
  // const theme = useContext(ThemeContext);
  const [showAnswer, setShowAnswer] = useState(false); 
  const toggleAnswer = () => setShowAnswer(!showAnswer);

    return (
    <ComposeFlashcardWrapper className="ComposeFlashcard">
      <div className="ComposeFlashcard__question">
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
      </div>
      <MediumButton
        className="ComposeFlashcard__toggle-button"
        type="button"
        onClick={toggleAnswer}
      >
        {!showAnswer ? 'SHOW ANSWER' : 'SHOW QUESTION'}
      </MediumButton>
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
  border: solid 1px grey;

  .ComposeFlashcard__question {
    flex-grow: 1;
    width: 100%;
    margin-bottom: 1rem;
    
    .ComposeFlashcard__question-text {
      margin: 0;
    }

    textarea[class^="ComposeFlashcard__input"] {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      border: none;
      resize: none;
      padding: .25rem;
      outline: 1px dashed grey;

      font-family: 'Rubik', sans-serif;
      font-size: 15px;
    }
  }

  .ComposeFlashcard__toggle-button {
    outline: none;
    &:hover {
    }
    &:active {
    }
    border-radius: 15px;
    width: 100%;
  }

  
`;

export default ComposeFlashcard;

// const ComposeFlashcardWrapper = styled.div`
//     box-sizing: border-box;
//     display: flex;
//     flex-flow: column nowrap;
//     justify-content: center;
//     align-items: center;
//     height: 100%;
  
//     border-radius: 20px;
//     margin-left: 1rem;
//     margin-right: 1rem;
//     padding: 1.5rem 1rem 1rem 1rem;
//     background: red;
//     color: ${theme.font.secondary};
  
//     .ComposeFlashcard__question {
//       flex-grow: 1;
//       width: 100%;
      
//       .ComposeFlashcard__question-text {
//         margin: 0;
//       }
//     }
  
//     .ComposeFlashcard__toggle-button {
//       background: ${theme.button.default.primary};
//       border: 2px solid ${theme.button.default.primary};
//       color: ${theme.font.primary};
//       outline: none;
//       &:hover {
//         background: ${theme.button.hover.primary};
//         border: 2px solid ${theme.button.hover.primary};
//       }
//       &:active {
//         border: 2px solid ${theme.button.active.primary};
//       }
//       border-radius: 15px;
//       width: 100%;
//     }
//   `;