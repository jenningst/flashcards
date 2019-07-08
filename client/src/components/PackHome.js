import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { usePackDispatch } from '../contexts/pack-context';

import LinkBackIcon from './icons/LinkBackIcon';
import { SmallButton } from './elements/Button';
import { Title1, Subhead, Caption3 } from './elements/Text';

function PackHome({ name, cards, image }) {
  const dispatch = usePackDispatch();
  const setReviewMode = () => dispatch({ type: 'SET_REVIEW_MODE'});
  const setComposeMode = () => dispatch({ type: 'SET_WRITE_MODE'});

  return (
    <PackHomeWrapper className="PackHome">
      <Header className="PackHome__header">
        <div className="nav-caption-combo">
          <IconButton className="PackHome__button-back" to="/"/>
          <Caption3 className="PackHome__button-caption">Back</Caption3>
        </div>
        <CardImage className="PackHome__image-card">
          <img src={image.src} alt={image.alt} />
        </CardImage>
      </Header>
      <PackInfo className="PackHome__info">
        <Title1 className="PackHome__title">{name}</Title1>
        <Subhead className="PackHome__count">
          {cards.length === 1 ? `${cards.length} FLASHCARD` : `${cards.length} FLASHCARDS`}
        </Subhead>
      </PackInfo>
      <Footer className="PackHome__footer">
        <SmallButton
          className="PackHome__button-review btn"
          type="button"
          onClick={setReviewMode}
          title="Test yourself"
          disabled={cards.length > 0 ? false : true}
        >
          Test
        </SmallButton>
        <SmallButton
          className="PackHome__button-edit btn"
          type="button"
          onClick={(e) => console.log(e.target.value)}
          title="Edit cards"
          disabled
        >
          Edit
        </SmallButton>
        <SmallButton
          className="PackHome__button-compose btn"
          type="button"
          onClick={setComposeMode}
          title="Create cards"
          >
          Add
        </SmallButton>
      </Footer>
    </PackHomeWrapper>
  );
};

const PackHomeWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: minmax(0, 1fr) repeat(2, minmax(12%, 15%));
  grid-row-gap: .50rem;
  height: 100%;
  padding: 1rem;
  background: ${props => props.theme.background.primary};
  color: ${props => props.theme.font.primary};
`;

const Header = styled.header`
  display: flex;
  flex-flow: column nowrap;

  .nav-caption-combo {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;

    a {
      margin-right: 1rem;
    }
  }
`;

const IconButton = styled(LinkBackIcon)`
  height: 2rem;
  width: 2rem;
`;

const CardImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 2rem;
  background: ${props => props.theme.background.secondary};

  img {
    width: 90%;
  }
`;

const PackInfo = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  h1 {
    margin-bottom: .25rem;
  }
`;

// TODO: add button theme
const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;

  .btn {
    height: 3rem;
    width: 3rem;
    border-radius: 10px;
  }

  .btn + .btn {
    margin-left: 2rem;
  }
`;

PackHome.propTypes = {
  name: PropTypes.string.isRequired,
  cards: PropTypes.array,
  image: PropTypes.object,
};

PackHome.defaultProps = {
  cards: [],
  image: {
    src: '',
    alt: '',
  },
};

export default PackHome;