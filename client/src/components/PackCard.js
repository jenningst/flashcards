import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

import { Title4 } from './Elements/Text';
import LinkButton from './Elements/LinkButton';

function PackCard({ _id, name }) {
  return (
    <PackCardWrapper
      className='PackCard'
      data-testid='card'
      type='button'
      to={`/pack/${_id}`}
    >
      <Title4
        className='PackCard__title'
      >
        {name}
      </Title4>
    </PackCardWrapper>
  );
};

const PackCardWrapper = styled(LinkButton)`
  padding: .70rem;
  background: ${props => props.theme.background.primary};
  border-radius: 1rem;
  min-height: 130px;
  border: none;
`;

PackCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withRouter(PackCard);