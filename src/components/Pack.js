import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/packContext';
import ThemeContext from '../contexts/themeContext';

import { Headline, Subhead} from '../components/Elements/Text';
import { ReactComponent as CancelIcon } from '../icons/error.svg';
import { ReactComponent as LeftArrow } from '../icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../icons/right-arrow.svg';
import { ReactComponent as OvalIcon } from '../icons/oval.svg';
import { SmallButton } from './Elements/Button';
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
  const exitToPackHome = () => dispatch({ type: 'CLEAR_MODE' });

  // State
  const [index, setIndex] = useState(0);
  const priorCard = () => setIndex(index - 1);
  const nextCard = () => setIndex(index + 1);

  // Constants for logic
  const currentQuestion = data.byId[data.allIds[index]];
  const zeroPaddedIndex = (index + 1).toString().padStart(3, '0');
  const packTotal = data.allIds.length;
  const zeroPaddedTotal = packTotal.toString().padStart(3, '0');
  
  console.log(`currentQuestion: ${JSON.stringify(currentQuestion, 2, null)}`);
  console.log(`zeroPaddedIndex: ${zeroPaddedIndex}`);
  console.log(`zeroPaddedTotal: ${zeroPaddedTotal}`);
  console.log(`packTotal: ${packTotal}`);

  const PackWrapper = styled.div`
    display: grid;
    grid-template-rows: minmax(11%, 13%) 1fr auto;
    grid-template-areas:
      "header"
      "card"
      "carousel";
    height: 100%;

    background: ${theme.background.primary};

    .Pack__header, .Pack__footer {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }

    .Pack__header {
      grid-area: header;
      color: ${theme.font.primary};
      padding: 1rem 1.5rem 0rem 1.5rem;
    }

    .Pack__button-close {
      height: 2rem;

      path {
        fill: ${theme.button.default.greyed};
      }

      &:hover {
        path {
          fill: ${theme.button.default.alert};
        }
      }
    }

    svg[class~="Pack__button-navigate"] {
      height: 2rem;
      path {
        fill: ${theme.background.special};
      }

      &:hover {
        path {
          fill: ${theme.background.special};
        }
      }

      &.disabled {
        path {
          fill: ${theme.button.default.greyed};
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
        color: ${theme.font.tertiary}
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
          fill: ${theme.background.special};
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

  return (
    <PackWrapper className="Pack">
      <header className="Pack__header">
        <CancelIcon 
          className="Pack__button-close"
          onClick={e => exitToPackHome()}
        />
        <div className="Pack__mode-pill">
          <Subhead>
            {mode}
          </Subhead>
        </div>
        <div className="Pack__counter">
          <div className="counter__current">
            <Headline>{zeroPaddedIndex}</Headline>
          </div>
          <div className="counter__total">
            <Subhead>/ {zeroPaddedTotal}</Subhead>
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
        mode === 'REVIEW_MODE'
        ?
          <Flashcard
            question={currentQuestion}
            // isAnswer={showAnswer}
            // toggle={toggleAnswer}
          />
        :
          <ComposeFlashcard
            question={currentQuestion}
        />
      }
      </section>
      <section className="Pack__carousel">
        <LeftArrow 
          className={`Pack__button-navigate${!packTotal || index === 0 ? ' disabled' : ''}`}
          onClick={priorCard}
        />
        {mode !== 'REVIEW_MODE'
          ? <SmallButton
            className=""
            >
              SAVE CARD
            </SmallButton>
          : null
        }
        <RightArrow 
          className={`Pack__button-navigate${!packTotal || index === packTotal - 1 ? ' disabled' : ''}`}
          onClick={nextCard}
        />
      </section>
    </PackWrapper>
  );
};

export default Pack;