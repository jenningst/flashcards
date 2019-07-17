import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Mutation } from  'react-apollo';
// our dependencies
import { useSession } from '../contexts/user-context';
import { usePackDispatch } from '../contexts/pack-context';
import { useKeyPress } from '../hooks/use-key-press';
import { GET_FLASHCARDS_BY_PACK, CREATE_FLASHCARD } from '../queries';
import { Title4, Caption3 } from './elements/Text';
import { PrimaryButton } from './elements/Button';
import { ReactComponent as Back } from '../components/icons/svg/back.svg';
import { ReactComponent as Left } from '../components/icons/svg/left-arrow.svg';
import { ReactComponent as Right } from '../components/icons/svg/right-arrow.svg';
import Flashcard from './Flashcard';
import ComposeFlashcard from './ComposeFlashcard';

function PackCarousel({ mode, filter, cards }) {
  const user = useSession();
  const dispatch = usePackDispatch();
  const [index, setIndex] = useState(0);
  const [questionText, setQuestionText] = useState('');
  const [questionAnswer, setQuestionAnswer] = useState('');
  const backPress = useKeyPress(37);
  const forwardPress = useKeyPress(39);

  const handleTextChange = e => setQuestionText(e.target.value);
  const handleAnswerChange = e => setQuestionAnswer(e.target.value);
  const exitToPackHome = () => dispatch({ type: 'RESET_MODE' });
  
  const saveCardAndRefresh = () => {
    setQuestionText('');
    setQuestionAnswer('');
    setIndex(index + 1);
  };

  // effect for left-arrow keypress and click handler for prior-card navigation
  useEffect(() => {
    if (backPress && index > 0) {
      setIndex(index - 1);
    }
  }, [backPress]);
  const priorCard = () => setIndex(index - 1);

  // effect for right-arrow keypress and click handler for next-card navigation
  useEffect(() => {
    if (forwardPress && index < cards.length - 1) {
      setIndex(index + 1);
    }
  }, [forwardPress]);
  const nextCard = () => setIndex(index + 1);

  const currentQuestion = cards[index];
  const isReviewMode = mode === 'REVIEW_MODE';
  
  const CreateFlashcard = () => {
    return (
      <Mutation
        mutation={CREATE_FLASHCARD}
        variables={{ owner: user.uid, pack_id: filter }}
        update={(cache, { data }) => {
          // get our current cards from the cache
          const { fetchFlashcardsByPack } = cache.readQuery({ 
            query: GET_FLASHCARDS_BY_PACK,
            variables: { owner: user.uid, pack_id: filter },
          });

          // write back to the cache, updating the data
          cache.writeQuery({
            query: GET_FLASHCARDS_BY_PACK,
            variables: { owner: user.uid, pack_id: filter },
            data: { 
              fetchFlashcardsByPack: [...fetchFlashcardsByPack, data.createFlashcard.card]
            },
          });
        }}
      >
        {(addFlashcard) => (
          <PrimaryButton
            className="PackCarousel__button-save"
            disabled={questionText && questionAnswer ? false : true}
            onClick={e => {
              addFlashcard({ variables: { input: {
                text: questionText,
                answer: questionAnswer,
                owner: user.uid,
                pack_id: filter,
              }}});
              saveCardAndRefresh();
            }}
            >
              SAVE CARD
            </PrimaryButton>
        )}
      </Mutation>
    )
  };

  return (
    <PackCarouselWrapper className="PackCarousel">
      <Header className="PackCarousel__header">
        <ButtonGroup className="btn-lbl-combo">
          <BackIcon
            className="PackCarousel__button-back btn-lbl-combo__icon"
            data-testid="button-back"
            onClick={e => exitToPackHome()}
          />
          <Caption3 className="PackHome__button-caption btn-lbl-combo__text">Back</Caption3>
        </ButtonGroup>
        {isReviewMode
          ? (
            <SummaryButton className="PackCarousel__button-summary">
              QUIZ SUMMARY
            </SummaryButton>
          ): null
        }
      </Header>
      
      <Counter className="PackCarousel__counter">
        <CounterBody className="counter-container">
          <Title4 className="counter-content">
            {isReviewMode
              ? `Question ${index + 1} of ${cards.length}`
              : `Question ${cards.length + 1} of ${cards.length + 1}`
            }
          </Title4>
        </CounterBody>
      </Counter>
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

      <CardNavigation className="PackCarousel__nav">
        {!isReviewMode
          ? (
            <CreateFlashcard />
          ) : (
            <>
              <PrimaryButton
                className='PackCarousel__button-back'
                onClick={priorCard}
                data-testid="button-back"
                disabled={index === 0 ? true : false}
              >
                PRIOR
              </PrimaryButton>
              <PrimaryButton
                className='PackCarousel__button-forward'
                onClick={nextCard}
                data-testid="button-forward"
                disabled={index === cards.length - 1 ? true : false}
              >
                NEXT
              </PrimaryButton>
            </>
          )
        }
      </CardNavigation>
    </PackCarouselWrapper>
  );
};

/* BLOCKS */

const PackCarouselWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto) minmax(0, 1fr) auto;
  height: 100%;
  background: ${props => props.theme.color.main.offWhite};
`;

const Header = styled.header`
  grid-row: 1 / span 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: ${props => props.theme.color.main.pureWhite};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  color: ${props => props.theme.font.primary};
`;

const Counter = styled.section`
  box-sizing: border-box;
  grid-row: 2 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem 0rem 1rem;
`;

const CardViewer = styled.section`
  box-sizing: border-box;
  grid-row: 3 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-height: 750px;
  padding: 0rem 1rem 1.5rem 1rem;
`;

const CardNavigation = styled.section`
  grid-row: 4 / span 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: .50rem 1rem 1rem 1rem;

  button {
    padding-left: 3rem;
    padding-right: 3rem;
  }

  @media screen and (min-width: 376px){
    justify-content: center;

    button + button {
      margin-left: 2rem;
    }
  }
`;

/* ELEMENTS */

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .btn-lbl-combo__icon {
    height: 2rem;
    width: 2rem;
    margin-right: .50rem;

    path {
      fill: ${props => props.theme.color.fonts.eerieBlack};
    }
  }

  .btn-lbl-combo__text {
    color: ${props => props.theme.color.main.primary};
  }
`;

const SummaryButton = styled(PrimaryButton)`
  height: 2rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 12px;
`;

const CounterBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 500px;
  flex-grow: 1;
  padding-top: .50rem;
  padding-bottom: .50rem;
  border-top-left-radius: .50rem;
  border-top-right-radius: .50rem;
  background: ${props => props.theme.color.main.secondary};
  color: ${props => props.theme.color.fonts.charleston};
`;

const BackIcon = styled(Back)`
  height: 2rem;

  &:hover {
    path {
      fill: ${props => props.theme.button.default.alert};
    }
  }
`;


PackCarousel.propTypes = {
  mode: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
};

export default PackCarousel;
