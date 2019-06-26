import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { usePackDispatch } from '../contexts/packContext';
import ThemeContext from '../contexts/themeContext';

import { Title4, Caption3 } from './Elements/Text';

PackCard.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string,
    count: PropTypes.number.isRequired,
    startCollection: PropTypes.func.isRequired,
  }),
};

function PackCard(props){
  const { name, image, count } = props;
  // Context
  const dispatch = usePackDispatch();
  const theme = useContext(ThemeContext);
  // Actions
  const setCollection = name => dispatch({ type: 'SET_COLLECTION', name });

  const PackCardWrapper = styled.button`
    padding: .70rem;
    background: ${theme.background.secondary};
    border-radius: 1rem;
    min-height: 130px;
    border: none;
  
    .PackCard__header {
      color: ${theme.font.primary};
      margin-bottom: .50em;
    }
  
    .PackCard__count-pill {
      background: ${theme.background.highlight};
      color: ${theme.font.primary};
      padding: .25rem;
      border-radius: 30rem;
    }
  `;

  return (
    <PackCardWrapper
        className="PackCard"
        type="button"
        onClick={e => setCollection(name)}
      >
        <Title4 className="PackCard__header">{name}</Title4>
        <div className="PackCard__count-pill">
          <Caption3 className="PackCard__count-text">{count} CARDS</Caption3>  
        </div>
      </PackCardWrapper>
  );
};


export default PackCard;