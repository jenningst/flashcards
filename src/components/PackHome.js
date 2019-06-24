import React from 'react';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/packContext';

import { ReactComponent as BackIcon } from '../icons/back.svg'
import { LargeButton } from './Elements/Button';

const PackHome = () => {
  const dispatch = usePackDispatch();
  const exitToDashboard = () => dispatch({ type: 'CLEAR_COLLECTION' });
  const setReviewMode = () => dispatch({ type: 'SET_REVIEW_MODE'});
  const setComposeMode = () => dispatch({ type: 'SET_WRITE_MODE'});

  return (
    <StyledPackHome className="PackHome">
      <header className="PackHome__header">
        <BackIcon 
          className="PackHome__button-back"
          type="button"
          onClick={exitToDashboard}
        />
      </header>
      <section className="PackHome__main">
        <LargeButton
          className="PackHome__button-compose"
          type="button"
          onClick={setComposeMode}
        >
          {"Compose Cards"}
        </LargeButton>
        <LargeButton
          className="PackHome__button-review"
          type="button"
          onClick={setReviewMode}
        >
          {"Review Cards"}
        </LargeButton>
      </section>
    </StyledPackHome>
  );
};

const StyledPackHome = styled.div`
  display: grid:
  grid-template-rows: minmax(13%, 15%) 1fr;
  height: 100%;

  .PackHome__header {
    grid-row: 1 / span 1;

    svg {
      height: 2rem;
    }
  }

  .PackHome__main {
    grid-row: 2 / span 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 100%;

    button {
      min-width: 15rem;
      max-width: 20rem;
    }

    button + button {
      margin-top: 1rem;
    }
  }
`;

export default PackHome;