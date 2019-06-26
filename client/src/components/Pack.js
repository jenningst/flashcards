import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/packContext';
import ThemeContext from '../contexts/themeContext';

import { zeroPad } from '../utilities/helpers';

import { Headline, Subhead} from './Elements/Text';
import { ReactComponent as CancelIcon } from '../icons/error.svg';
import { ReactComponent as LeftArrow } from '../icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../icons/right-arrow.svg';
import { ReactComponent as OvalIcon } from '../icons/oval.svg';
import { MediumButton } from './Elements/Button';
import Flashcard from './Flashcard';
import ComposeFlashcard from './ComposeFlashcard';

Pack.propTypes = {
  mode: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

function Pack({ mode, data }) {
  // Context
  const theme = useContext(ThemeContext);
  const dispatch = usePackDispatch();
  const [index, setIndex] = useState(0);

  const exitToPackHome = () => dispatch({ type: 'CLEAR_MODE' });
  const isReviewMode = mode === 'REVIEW_MODE';

  // Setup display counters for REVIEW vs WRITE modes
  const packTotal = data.questions.allIds.length;
  const zeroPaddedTotal = isReviewMode ? zeroPad(packTotal) : zeroPad(parseInt(packTotal + 1));
  const zeroPaddedIndex = isReviewMode ? zeroPad(index + 1) : zeroPad(parseInt(packTotal + 1));
  
  const priorCard = () => setIndex(index - 1);
  const nextCard = () => setIndex(index + 1);
  const saveCard = () => {
    const cardPayload = {
      text: questionText,
      answer: questionAnswer,
    };
    // TODO: persist this to context/state higher in the tree
    // update our index to the next number
  }

  const [questionText, setQuestionText] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const handleTextChange = e => setQuestionText(e.target.value);
  const handleAnswerChange = e => setQuestionAnswer(e.target.value);

  // Constants for logic
  const currentQuestion = data.questions.byId[data.questions.allIds[index]];
  // Prettify mode name
  const modeName = mode.replace('_', ' ');

  return (
    <PackWrapper className="Pack">
      <header className="Pack__header">
        <CancelIcon 
          className="Pack__button-close"
          onClick={e => exitToPackHome()}
        />
        <div className="Pack__mode-pill">
          <Subhead>
            {modeName}
          </Subhead>
        </div>
        <div className="Pack__counter">
          <div className="counter__current">
            <Headline>
              {zeroPaddedIndex}
            </Headline>
          </div>
          <div className="counter__total">
            <Subhead>
              {`/ ${zeroPaddedTotal}`}
            </Subhead>
          </div>
          <div className="counter__active">
            <OvalIcon
              className="active-dot"
            />
          </div>
        </div>
      </header>
      <section className="Pack__card-viewer">
      {
        isReviewMode
        ?
          <Flashcard
            question={currentQuestion}
          />
        :
          <ComposeFlashcard
            handleTextChange={handleTextChange}
            handleAnswerChange={handleAnswerChange}
            questionText={questionText}
            questionAnswer={questionAnswer}
        />
      }
      </section>
      <section className="Pack__carousel">
        {!isReviewMode
          ? <MediumButton
              className="Pack_button-save"
              disabled={questionText && questionAnswer ? false : true}
              onClick={saveCard}
              >
                SAVE CARD
              </MediumButton>
          : <React.Fragment>
              <LeftArrow 
                className={`Pack__button-navigate${index === 0 ? ' disabled' : ''}`}
                onClick={priorCard}
              />
              <RightArrow 
                className={`Pack__button-navigate${index === packTotal - 1 ? ' disabled' : ''}`}
                onClick={nextCard}
              />
            </React.Fragment>
        }
      </section>
    </PackWrapper>
  );
};

const PackWrapper = styled.div`
    display: grid;
    grid-template-rows: minmax(11%, 13%) 1fr minmax(0%, 12%);
    grid-template-areas:
      "header"
      "card"
      "carousel";
    height: 100%;

    

    .Pack__header, .Pack__footer {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    .Pack__header {
      grid-area: header;
      
      padding: 1rem 1.5rem 0rem 1.5rem;

      .Pack__mode-pill {
        background: blue;
        color: white;
        border-radius: 30px;
        padding: .25rem .75rem .25rem .75rem;
      }
    }

    .Pack__button-close {
      height: 2rem;

      path {
        
      }

      &:hover {
        path {
          
        }
      }
    }

    svg[class~="Pack__button-navigate"] {
      height: 2rem;
      path {
        
      }

      &:hover {
        path {
          
        }
      }

      &.disabled {
        path {

        }
        pointer-events: none;
      }
    }

    .Pack__title {
      flex-grow: 1;
    }

    .Pack__counter {
      display: grid;
      grid-template-columns: auto auto;
      grid-template-rows: auto auto;
      grid-template-areas:
        "aside current"
        "unused total";

      p {

      }

      .counter__current {
        grid-area: current;
        width: 4rem;
        height: 2.25rem;
      }

      .counter__total {
        grid-area: total;
        display: flex;
        justify-content: flex-start;
      }

      .counter__active {
        grid-area: aside;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding-right: .3rem;

        svg {
          height: .50rem;
        }

        path {

        }
      }
    }

    .Pack__carousel {
      grid-area: carousel;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      padding: 1rem;
    }

    .Pack__card-viewer {
      grid-area: card;
      padding-bottom: 1rem;
    }
  `;

export default Pack;

// const PackWrapper = styled.div`
//     display: grid;
//     grid-template-rows: minmax(11%, 13%) 1fr auto;
//     grid-template-areas:
//       "header"
//       "card"
//       "carousel";
//     height: 100%;

//     background: ${theme.background.primary};

//     .Pack__header, .Pack__footer {
//       display: flex;
//       flex-flow: row nowrap;
//       justify-content: space-between;
//       align-items: center;
//     }

//     .Pack__header {
//       grid-area: header;
//       color: ${theme.font.primary};
//       padding: 1rem 1.5rem 0rem 1.5rem;
//     }

//     .Pack__button-close {
//       height: 2rem;

//       path {
//         fill: ${theme.button.default.greyed};
//       }

//       &:hover {
//         path {
//           fill: ${theme.button.default.alert};
//         }
//       }
//     }

//     svg[class~="Pack__button-navigate"] {
//       height: 2rem;
//       path {
//         fill: ${theme.background.special};
//       }

//       &:hover {
//         path {
//           fill: ${theme.background.special};
//         }
//       }

//       &.disabled {
//         path {
//           fill: ${theme.button.default.greyed};
//         }
//         pointer-events: none;
//       }
//     }

//     .Pack__title {
//       flex-grow: 1;
//     }

//     .Pack__counter {
//       display: grid;
//       grid-template-columns: auto auto;
//       grid-template-rows: auto auto;
//       grid-template-areas:
//         "aside current"
//         "unused total";

//       p {
//         color: ${theme.font.tertiary}
//       }

//       .counter__current {
//         grid-area: current;
//         width: 4rem;
//         height: 2.25rem;
//       }

//       .counter__total {
//         grid-area: total;
//         display: flex;
//         justify-content: flex-start;
//       }

//       .counter__active {
//         grid-area: aside;
//         display: flex;
//         flex-flow: column nowrap;
//         justify-content: center;
//         align-items: center;
//         height: 100%;
//         padding-right: .3rem;

//         svg {
//           height: .50rem;
//         }

//         path {
//           fill: ${theme.background.special};
//         }
//       }
//     }

//     .Pack__carousel {
//       grid-area: carousel;
//       display: flex;
//       justify-content: space-evenly;
//       align-items: center;
//       padding: 1rem;
//     }

//     .Pack__card-viewer {
//       grid-area: card;
//       padding-bottom: 1rem;
//     }
//   `;