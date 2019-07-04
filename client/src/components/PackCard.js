import React, { useContext } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/themeContext';
import { usePackDispatch } from '../contexts/packContext';
import { slugify } from '../utilities/helpers';

import { withRouter } from 'react-router';

import { Title4, Caption3 } from './elements/Text';
import LinkButton from './elements/LinkButton';

PackCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
};

function PackCard({ _id, name, image, match }) {
  const theme = useContext(ThemeContext);
  const dispatch = usePackDispatch();
  const setPack = () => dispatch({ type: 'SET_PACK_FILTER', id: _id, name: name });

  const PackCardWrapper = styled(LinkButton)`
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

  // console.log(match);

  return (
    <PackCardWrapper
        className="PackCard"
        to={`/pack/${_id}`}
        onClick={setPack}
      >
        <Title4 className="PackCard__header">{name}</Title4>
        <div className="PackCard__count-pill">
          <Caption3 className="PackCard__count-text">CARDS</Caption3>  
        </div>
      </PackCardWrapper>
  );
};


export default withRouter(PackCard);