import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Back } from './svg/back.svg';

const LinkBackIcon = props => {
  const {
    to,
    onClick,
    ...rest
  } = props;

  return (
    <Link
      to={to}
      style={{ display: 'flex', height: '2rem', width: '2rem'}}
    >
      <Back
        {...rest}
        onClick={onClick}
        style={ { height: '100%', width: '100%', overflow: 'hidden' } }
      />
    </Link>
  );
};

export default LinkBackIcon;