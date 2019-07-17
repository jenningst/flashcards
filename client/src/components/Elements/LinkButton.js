import React from 'react';
import PropTypes from 'prop-types';
import { PrimaryButton } from '../elements/Button';
import { withRouter } from 'react-router-dom';

const LinkButton = props => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    ...rest
  } = props;

  return (
    <PrimaryButton
      {...rest}
      onClick={(e) => {
        onClick && onClick(e)
        history.push(to)
      }}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default withRouter(LinkButton);