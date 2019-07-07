import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/packContext';
import { Mutation } from  'react-apollo';
import { GET_FLASHCARDS_BY_PACK, CREATE_FLASHCARD} from '../queries';

import { zeroPad } from '../utilities/helpers';

import { Headline, Subhead} from './Elements/Text';
import { MediumButton } from './Elements/Button';
import { ReactComponent as CancelIcon } from '../components/icons/svg/error.svg';
import { ReactComponent as LeftArrow } from '../components/icons/svg/left-arrow.svg';
import { ReactComponent as RightArrow } from '../components/icons/svg/right-arrow.svg';
import { ReactComponent as OvalIcon } from '../components/icons/svg/oval.svg';
import Flashcard from './Flashcard';
import ComposeFlashcard from './ComposeFlashcard';

function PackCarousel({ mode, filter, cards }) {
  const dispatch = usePackDispatch();

  const [index, setIndex] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const handleTextChange = e => setQuestionText(e.target.value);
  const handleAnswerChange = e => setQuestionAnswer(e.target.value);

  const exitToPackHome = () => dispatch({ type: 'CLEAR_MODE' });
  const priorCard = () => setIndex(index - 1);
  const nextCard = () => setIndex(index + 1);

  const saveCardAndRefresh = () => {
    setQuestionText('');
    setQuestionAnswer('');
    setIndex(index + 1);
  };

  const currentQuestion = cards[index];
  const isReviewMode = mode === 'REVIEW_MODE';
  const prettyModeName = mode.replace('_', ' ');
  const zeroPaddedTotal = isReviewMode ? zeroPad(cards.length) : zeroPad(parseInt(cards.length + 1));
  const zeroPaddedIndex = isReviewMode ? zeroPad(index + 1) : zeroPad(parseInt(cards.length + 1));
  
  const CreateFlashcard = () => {
    return (
      <Mutation
        mutation={CREATE_FLASHCARD}
        update={(cache, { data }) => {
          // get our current cards from the cache
          const { fetchFlashcardsByPack } = cache.readQuery({ 
            query: GET_FLASHCARDS_BY_PACK,
            variables: { id: filter },
          });

          // write back to the cache, updating the data
          cache.writeQuery({
            query: GET_FLASHCARDS_BY_PACK,
            variables: { id: filter },
            data: { 
              fetchFlashcardsByPack: [...fetchFlashcardsByPack, data.createFlashcard.card]
            },
          });
        }}
      >
        {(addFlashcard) => (
          <MediumButton
            className="PackCarousel__button-save"
            disabled={questionText && questionAnswer ? false : true}
            onClick={e => {
              addFlashcard({ variables: { input: {
                text: questionText,
                answer: questionAnswer,
                user_id: "1",
                pack_id: filter,
              }}});
              saveCardAndRefresh();
            }}
            >
              SAVE CARD
            </MediumButton>
        )}
      </Mutation>
    )
  };

  return (
    <PackCarouselWrapper className="PackCarousel">

      <Header className="PackCarousel__header">
        <StyledClose 
          className="PackCarousel__button-close"
          onClick={e => exitToPackHome()}
        />
        <div className="PackCarousel__mode">
          <Subhead>{prettyModeName}</Subhead>
        </div>
        <Counter className="PackCarousel__counter counter-group">
          <div className="counter-group__current">
            <Headline>{zeroPaddedIndex}</Headline>
          </div>
          <div className="counter-group__total">
            <Subhead>{`/ ${zeroPaddedTotal}`}</Subhead>
          </div>
          <div className="counter-group__indicator">
            <OvalIcon className="active-dot" />
          </div>
        </Counter>
      </Header>

      <CardViewer className="PackCarousel__card-viewer">
        {isReviewMode
          ? (
              <Flashcard
                card={currentQuestion}
              />
          ) : (
              <ComposeFlashcard
                handleTextChange={handleTextChange}
                handleAnswerChange={handleAnswerChange}
                questionText={questionText}
                questionAnswer={questionAnswer}
              />
          )
        }
      </CardViewer>

      <BottomNav className="PackCarousel__nav">
        {!isReviewMode
          ? (
            <CreateFlashcard />
          ) : (
            <>
              <LeftArrow 
                className={`PackCarousel__button-nav${index === 0 ? ' disabled' : ''} back`}
                onClick={priorCard}
              />
              <RightArrow 
                className={`PackCarousel__button-nav${index === cards.length - 1 ? ' disabled' : ''} forward`}
                onClick={nextCard}
              />
            </>
          )
        }
      </BottomNav>
    </PackCarouselWrapper>
  );
};

const PackCarouselWrapper = styled.div`
  display: grid;
  grid-template-rows: minmax(11%, 13%) 1fr auto;
  grid-template-areas:
    "header"
    "card"
    "carousel";
  height: 100%;

  background: ${props => props.theme.background.primary};
`;

const Header = styled.header`
  grid-area: header;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  color: ${props => props.theme.font.primary};
  padding: 1rem 1.5rem 0rem 1.5rem;
`;

const BottomNav = styled.footer`
  grid-area: carousel;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 1rem;

  svg[class~="PackCarousel__button-nav"] {
    height: 2rem;
    path {
      fill: ${props => props.theme.background.special};
    }

    &:hover {
      path {
        fill: ${props => props.theme.background.special};
      }
    }

    &.disabled {
      path {
        fill: ${props => props.theme.button.default.greyed};
      }
      pointer-events: none;
    }
  }
`;

const StyledClose = styled(CancelIcon)`
  height: 2rem;

  path {
    fill: ${props => props.theme.button.default.greyed};
  }

  &:hover {
    path {
      fill: ${props => props.theme.button.default.alert};
    }
  }
`;

const CardViewer = styled.section`
  grid-area: card;
  padding-bottom: 1rem;
`;

const Counter = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: auto auto;
  grid-template-areas:
    "aside current"
    "unused total";

  p {
    color: ${props => props.theme.font.tertiary}
  }

  .counter-group__current {
    grid-area: current;
    width: 4rem;
    height: 2.25rem;
  }

  .counter-group__total{
    grid-area: total;
    display: flex;
    justify-content: flex-start;
  }

  .counter-group__indicator {
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
      fill: ${props => props.theme.background.special};
    }
  }
`;

PackCarousel.propTypes = {
  mode: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
};

export default PackCarousel;
