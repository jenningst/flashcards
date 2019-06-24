import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/packContext';
import ThemeContext from '../contexts/themeContext';

import { Headline, Subhead, Title1, Body } from '../components/Elements/Text';
import Flashcard from './Flashcard';
import { ReactComponent as CancelIcon } from '../icons/error.svg';
import { ReactComponent as LeftArrow } from '../icons/left-arrow.svg';
import { ReactComponent as RightArrow } from '../icons/right-arrow.svg';
import { ReactComponent as OvalIcon } from '../icons/oval.svg';
import { LargeButton, SmallButton } from './Elements/Button';

Pack.propTypes = {
  pack: PropTypes.string.isRequired,
};

function Pack({ pack }) {
  // Context
  const theme = useContext(ThemeContext);
  const dispatch = usePackDispatch();
  const exitToDashboard = () => dispatch({ type: 'CLEAR_COLLECTION' });

  // State
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  // Action types
  const toggleAnswer = () => setShowAnswer(!showAnswer);
  const priorCard = () => setIndex(index - 1);
  const nextCard = () => setIndex(index + 1);

  // todo: pull in question collection into state
  const data = {
    javascript: {
      questions: {
        byId: {
          1: {
            id: 1,
            text: '"JavaScript lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ultrices eros. Mauris bibendum orci purus, id luctus odio molestie eu. Suspendisse potenti. Donec ut eleifend lacus. Suspendisse malesuada ante bibendum, cursus mi id, finibus arcu. Cras convallis tincidunt facilisis. Cras ac orci non justo elementum pellentesque non eu orci. Integer bibendum nec nulla at tempor. Nunc faucibus felis auctor nisi iaculis semper in nec enim. Nullam dui urna, auctor eu ante non, aliquet volutpat?"',
            answer: '4',
          },
          2: {
            id: 2,
            text: 'What is the capitol of Sweden?',
            answer: 'Stockholm',
          },
        },
        allIds: [1, 2],
      },
    },
    css: {
      questions: {
        byId: {
          1: {
            id: 1,
            text: '"CSS lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae ultrices eros. Mauris bibendum orci purus, id luctus odio molestie eu. Suspendisse potenti. Donec ut eleifend lacus. Suspendisse malesuada ante bibendum, cursus mi id, finibus arcu. Cras convallis tincidunt facilisis. Cras ac orci non justo elementum pellentesque non eu orci. Integer bibendum nec nulla at tempor. Nunc faucibus felis auctor nisi iaculis semper in nec enim. Nullam dui urna, auctor eu ante non, aliquet volutpat?"',
            answer: 'Flexbox, duh.',
          },
          2: {
            id: 2,
            text: 'Who is your daddy and what does he do?',
            answer: 'Um, nun-ya-business',
          },
        },
        allIds: [1, 2],
      }
    },
    angular: {
      questions: {
        byId: {},
        allIds: [],
      },
    },
    html: {
      questions: {
        byId: {},
        allIds: [],
      },
    },
    react: {
      questions: {
        byId: {},
        allIds: [],
      },
    },
    theory: {
      questions: {
        byId: {},
        allIds: [],
      },
    },
  };

  // Constants for logic
  const currentQuestion = data[pack.toLowerCase()].questions.byId[data[pack.toLowerCase()].questions.allIds[index]];
  const zeroPaddedIndex = (index + 1).toString().padStart(3, '0');
  const packTotal = data[pack.toLowerCase()].questions.allIds.length;
  const zeroPaddedTotal = packTotal.toString().padStart(3, '0');

  // console.log(currentQuestion);
  // console.log(zeroPaddedIndex);
  // console.log(packTotal);
  // console.log(zeroPaddedTotal);

  const PackWrapper = styled.div`
    display: grid;
    grid-template-rows: minmax(11%, 13%) auto 1fr;
    grid-template-areas:
      "header"
      "carousel"
      "card";
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

  if(!packTotal) {
    return (
      <div>
        <Title1>No Flashcards Yet!</Title1>
        <Body>Create your first flashcard in this deck</Body>
        <LargeButton>Create Flashcard</LargeButton>
        
        <SmallButton
          type="button"
          onClick={e => exitToDashboard()}
        >
          Back to Dashboard
        </SmallButton>
      </div>
    );
  };

  return (
    <PackWrapper className="Pack">
      <header className="Pack__header">
        <CancelIcon 
          className="Pack__button-close"
          onClick={e => exitToDashboard()}
        />
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
      <section className="Pack__carousel">
        <LeftArrow 
          className={`Pack__button-navigate${!packTotal || index === 0 ? ' disabled' : ''}`}
          onClick={priorCard}
        />
        <RightArrow 
          className={`Pack__button-navigate${!packTotal || index === packTotal - 1 ? ' disabled' : ''}`}
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