import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/packContext';

import LinkBackIcon from './icons/LinkBackIcon';
import { LargeButton } from './Elements/Button';
import { Title1, Subhead } from './Elements/Text';

PackHome.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.array,
};

function PackHome({ name, cards }) {
  const dispatch = usePackDispatch();
  const setReviewMode = () => dispatch({ type: 'SET_REVIEW_MODE'});
  const setComposeMode = () => dispatch({ type: 'SET_WRITE_MODE'});

  return (
    <StyledPackHome className="PackHome">
      <header className="PackHome__header">
        <LinkBackIcon className="Dashboard__menu-button" to="/"/>
      </header>
      <section className="PackHome__main">
        <div className="PackHome__card">
          <div className="card-content">
            <Title1>{name}</Title1>
            <Subhead>{cards.length} FLASHCARDS</Subhead>
          </div>
          <LargeButton
            className="PackHome__button-review card-button"
            type="button"
            onClick={setReviewMode}
            disabled={cards.length > 0 ? false : true}
          >
            {"Begin Review"}
          </LargeButton>
        </div>
      </section>
      <footer className="PackHome__footer">
        <LargeButton
          className="PackHome__button-compose"
          type="button"
          onClick={setComposeMode}
          >
          {"Compose More Cards"}
        </LargeButton>
      </footer>
    </StyledPackHome>
  );
};

const StyledPackHome = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  grid-template-areas:
    "header"
    "main"
    "footer";
  height: 100%;

  .PackHome__header {
    grid-area: header;
    padding: 1rem 1rem 0 1rem;
    svg {
      height: 2rem;
    }
  }

  .PackHome__main {
    grid-area: main;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .PackHome__card {
    display: grid;
    grid-template-rows: 1fr minmax(15%, 20%);
    grid-template-areas:
      "content"
      "footer";

    height: 100%;
    width: 75%;
    border-radius: 1rem;
    margin: 1rem;
    background: #ffc600;

    .card-content {
      grid-area: content;
      margin: 2rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-items: flex-end;

      h1 {
        margin-bottom: 1rem;
      }
    }

    button[class~="card-button"] {
      grid-area: footer;
      margin: 1rem;
    }
  }

  .PackHome__footer {
    grid-area: footer;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    button + button {
      margin-top: 1rem;
    }
  }
`;

export default PackHome;