import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { usePackDispatch } from '../contexts/pack-context';
import { ReactComponent as Back } from '../components/icons/svg/back.svg';
import { ReactComponent as EditIcon } from '../components/icons/svg/pencil.svg';
import { ReactComponent as TestIcon } from '../components/icons/svg/play-button.svg';
import { ReactComponent as AddIcon } from '../components/icons/svg/plus.svg';
import { Title2, Caption3 } from './elements/Text';

function PackHome({ name, cards, image }) {
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
        <CardImage className="PackHome__image-card">
          <img src={image.src} alt={image.alt} />
        </CardImage>
      </Header>
      <PackInfo className="PackHome__info">
        <Title2 className="PackHome__title">
          {name}
        </Title2>
        <Caption3 className="PackHome__count">
          {cards.length === 1 ? `${cards.length} FLASHCARD` : `${cards.length} FLASHCARDS`}
        </Caption3>
      </PackInfo>
      <Footer className="PackHome__footer">
        {
          cards.length > 0
          ? (
              <>
                <ButtonGroup
                  className="btn-lbl-combo"
                  data-testid="test-btn"
                  onClick={setReviewMode}
                >
                  <TestIcon className="PackHome__button-test ico"/>
                  <Caption3>TEST</Caption3>
                </ButtonGroup>

                <ButtonGroup
                  className="btn-lbl-combo"
                  data-testid="edit-btn"
                  onClick={(e) => console.log('clicked edit button')}
                >
                  <EditIcon className="PackHome__button-edit ico" />
                  <Caption3>EDIT</Caption3>
                </ButtonGroup>
              </>
          ):(
            null
          )
        }
        <ButtonGroup
          className="btn-lbl-combo"
          data-testid="add-btn"
          onClick={setComposeMode}
        >
          <AddIcon className="PackHome__button-add ico"/>
          <Caption3>ADD</Caption3>
        </ButtonGroup>
      </Footer>
    </PackHomeWrapper>
  );
};

const PackHomeWrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-rows: minmax(0, 1fr) repeat(2, auto);
  grid-row-gap: .50rem;
  height: 100%;
  background: ${props => props.theme.color.main.offWhite};
  color: ${props => props.theme.color.fonts.charleston};
`;

const Header = styled.header`
  display: flex;
  flex-flow: column nowrap;
  padding: 1.5rem;

  div[class~="btn-lbl-combo"] {
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;

    svg {
      margin-right: .50rem;
    }

    h6 {
      color: ${props => props.theme.color.main.primary};
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const BackIcon = styled(Back)`
  height: 2rem;
  width: 2rem;
`;

const CardImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: ${props => props.theme.color.main.pureWhite};
  border-radius: 2rem;
  box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);
`;

const PackInfo = styled.section`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;

  .PackHome__title {
    margin-bottom: .25rem;
    font-weight: 500;
    color: ${props => props.theme.color.main.primary};
  }
  .PackHome__count {
    color: ${props => props.theme.color.fonts.grey};
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem;

  div[class~="btn-lbl-combo"] {
    justify-content: center;
    align-items: center;
    background: ${props => props.theme.color.main.primary};
    color: ${props => props.theme.color.main.pureWhite};
    padding: .75rem 1rem .75rem 1rem;
    border-radius: .50rem;
    box-shadow: 0px 10px 18px -11px rgba(120,119,120,1);

    svg {
      height: 1rem;
      width: 1rem;
      margin-right: .50rem;
      path {
        fill: ${props => props.theme.color.main.pureWhite};
      }
    }
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

