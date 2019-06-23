import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import CollectionContext from '../contexts/collectionContext';
import ThemeContext from '../contexts/themeContext';

import { Headline, Subhead } from '../components/Elements/Text';
import { SmallButton } from '../components/Elements/Button';
import { Icon } from '../components/Elements/Icon';
import ICONS from '../constants/icons';
import Flashcard from './Flashcard';
import { ReactComponent as CancelIcon } from '../icons/error.svg';
import { ReactComponent as LeftArrow } from '../icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../icons/right-arrow.svg';

function Pack({ pack }) {
  // Context
  const { dispatch } = useContext(CollectionContext);
  const clearCollection = () => dispatch({ type: 'CLEAR_COLLECTION' });
  const theme = useContext(ThemeContext);

  // State
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Action types
  const toggleAnswer = () => setShowAnswer(!showAnswer);
  const priorCard = () => setIndex(index - 1);
  const nextCard = () => setIndex(index + 1);

  // todo: pull in question collection into state
  const questions = {
    questions: {
      byId: {
        1: {
          id: 1,
          text: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ultrices eros. Mauris bibendum orci purus, id luctus odio molestie eu. Suspendisse potenti. Donec ut eleifend lacus. Suspendisse malesuada ante bibendum, cursus mi id, finibus arcu. Cras convallis tincidunt facilisis. Cras ac orci non justo elementum pellentesque non eu orci. Integer bibendum nec nulla at tempor. Nunc faucibus felis auctor nisi iaculis semper in nec enim. Nullam dui urna, auctor eu ante non, aliquet volutpat?"',
          answer: '4',
        },
        2: {
          id: 2,
          text: 'What is the capitol of Sweden?',
          answer: 'Stockholm',
        },
      },
      allIds: [1, 2],
    }
  };

  const currentQuestion = questions.questions.byId[questions.questions.allIds[index]];
  const zeroPaddedIndex = (index + 1).toString().padStart(3, '0');
  const packTotal = questions.questions.allIds.length;
  const zeroPaddedTotal = packTotal.toString().padStart(3, '0');

  const PackWrapper = styled.div`
  display: grid;
  grid-template-rows: minmax(11%, 13%) auto 1fr;
  grid-template-areas:
    "header"
    "carousel"
    "card";
  height: 100%;

  background: ${'#282626'};
  color: ${'#E0E0E0'};

  .Pack__header, .Pack__footer {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }

  .Pack__header {
    grid-area: header;
    color: ${'#FFFFFF'};
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
      justify-content: flex-end;
      padding-right: .52rem;
    }

    .counter__active {
      grid-area: aside;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      height: 100%;

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
          onClick={e => clearCollection()}
        />
        <div className="Pack__counter">
          <div className="counter__current">
            <Headline>{zeroPaddedIndex}</Headline>
          </div>
          <div className="counter__total">
            <Subhead>/{zeroPaddedTotal}</Subhead>
          </div>
          <div className="counter__active">
            <Icon 
              icon={ICONS.OVAL}
              className="active-dot"
            />
          </div>
        </div>
      </header>
      <section className="Pack__carousel">
        <LeftArrow 
          className={`Pack__button-navigate${index === 0 ? ' disabled' : ''}`}
          onClick={priorCard}
        />
        <RightArrow 
          className={`Pack__button-navigate${index === packTotal-1 ? ' disabled' : ''}`}
          onClick={nextCard}
        />
      </section>
      <section className="Pack__card-viewer">
        <Flashcard
          key={currentQuestion.id}
          text={showAnswer ? currentQuestion.answer : currentQuestion.text}
          isAnswer={showAnswer}
          toggle={toggleAnswer}
        />
      </section>
    </PackWrapper>
  );
};

export default Pack;