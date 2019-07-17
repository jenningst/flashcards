import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { usePackDispatch } from '../contexts/pack-context';
import { ReactComponent as Back } from '../components/icons/svg/back.svg';
import { ReactComponent as Settings } from '../components/icons/svg/settings.svg';
import { PrimaryButton } from '../components/elements/Button';
import { Title2, Caption3, Body } from './elements/Text';

PackHome.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.array,
};

PackHome.defaultProps = {
  cards: [],
};

function PackHome({ name, cards }) {
  const dispatch = usePackDispatch();
  const setReviewMode = () => dispatch({ type: 'SET_REVIEW_MODE'});
  const setComposeMode = () => dispatch({ type: 'SET_WRITE_MODE'});

  return (
    <PackHomeWrapper className="PackHome">

      <Header className="PackHome__header">
        
        <ButtonGroup className="btn-lbl-combo">
          <Link className="btn-lbl-combo__link" to="/">
            <BackIcon
              className="PackHome__button-back btn-lbl-combo__icon"
              data-testid="button-back"
            />
          </Link>
          <Caption3 className="PackHome__button-caption">Back</Caption3>
        </ButtonGroup>
        <SettingsIcon
          data-testid="edit-btn"
          onClick={(e) => console.log('clicked edit button')}
        />
      </Header>

      <StatsSection className="PackHome__stats stats-section">
        <StatsCard className="stats-card">
          <Body className='stat-section__body'>Stats Coming Soon!</Body>
        </StatsCard>
      </StatsSection>

      <PackInfoSection className="PackHome__info">
        <Title2 className="PackHome__title">
          {name}
        </Title2>
        <CounterPill className="PackHome__pill">
          <Caption3 className="PackHome__count">
            {cards.length === 1 ? `${cards.length} FLASHCARD` : `${cards.length} FLASHCARDS`}
          </Caption3>
        </CounterPill>
      </PackInfoSection>

      <PackControls className="PackHome__controls">
        {
          cards.length > 0
          ? (
              <PrimaryButton
                className="btn-lbl-combo"
                data-testid="test-btn"
                onClick={setReviewMode}
              >
                TEST
              </PrimaryButton>
          ):(
            null
          )
        }
        <PrimaryButton
          className="btn-lbl-combo"
          data-testid="add-btn"
          onClick={setComposeMode}
        >
          ADD
        </PrimaryButton>
      </PackControls>
    </PackHomeWrapper>
  );
};

/* BLOCKS */

const PackHomeWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: auto 1fr repeat(2, auto);
  grid-row-gap: 1rem;
  height: 100%;
  background: ${props => props.theme.color.background.offWhite};
  color: ${props => props.theme.color.font.charleston};
`;

const Header = styled.header`
  box-sizing: border-box;
  grid-row: 1 / span 1;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  background: ${props => props.theme.color.background.pureWhite};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);

  div[class~="btn-lbl-combo"] {
    justify-content: flex-start;
    align-items: center;

    svg {
      margin-right: .50rem;
    }

    h6 {
      color: ${props => props.theme.color.font.primary};
    }
  }
`;

const StatsSection = styled.section`
  grid-row: 2 / span 1;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1rem;
`;

const PackInfoSection = styled.section`
  grid-row: 3 / span 1;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .PackHome__title {
    margin-bottom: .25rem;
    font-weight: 500;
  }
`;

const PackControls = styled.section`
  box-sizing: border-box;
  grid-row: 4 / span 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1rem 0rem 1rem 0rem;

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

const StatsCard = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 500px;
  background: ${props => props.theme.color.background.pureWhite};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
  border-radius: .50rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;

  a {
    margin: 0;
    padding: 0;
  }
`;

const BackIcon = styled(Back)`
  height: 2rem;
  width: 2rem;
`;

const SettingsIcon = styled(Settings)`
  height: 1.5rem;
  width: 1.5rem;
`;

const CounterPill = styled.div`
  background: ${props => props.theme.color.button.secondaryHover};
  border-radius: 1rem;
  padding: .25rem 1rem .25rem 1rem;

  h6 {
    color: ${props => props.theme.color.font.pureWhite};
  }
`;

export default PackHome;

