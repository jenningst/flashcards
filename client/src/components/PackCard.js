import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

import { Title4 } from './elements/Text';

function PackCard({ _id, name }) {
  return (
    <LinkWrapper to={`/pack/${_id}`}>
      <OuterWrapper>
        <PackCardContent
          className='PackCard'
          data-testid='card'
          type='button'
        >
          <Title4
            className='PackCard__title'
          >
            {name}
          </Title4>
        </PackCardContent>
      </OuterWrapper>
    </LinkWrapper>
  );
};

const LinkWrapper = styled(Link)`
  text-decoration: none;
`;

const BaseWrapper = styled.div`
  box-sizing: border-box;
  border-radius: 1rem;
`;

const OuterWrapper = styled(BaseWrapper)`
  background: #6E78CE;
  padding-bottom: .50rem;
`;

const PackCardContent = styled(BaseWrapper)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .70rem;
  min-height: 100px;
  border: none;
  background: ${props => props.theme.color.main.primary};
  color: ${props => props.theme.color.fonts.offWhite};

  &:hover {
    background-color: ${props => props.theme.color.main.primaryHover};
    h4 {
      font-weight: 500;
    }
  }

  h4 {
    text-align: center;
    font-weight: 400;
  }
`;

PackCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default withRouter(PackCard);