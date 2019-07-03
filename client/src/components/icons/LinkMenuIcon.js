import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Menu } from './svg/menu.svg';

const LinkMenuIcon = props => {
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
      <Menu
        {...rest}
        onClick={onClick}
        style={ { height: '100%', width: '100%', overflow: 'hidden' } }
      />
    </Link>
  );
};

export { LinkMenuIcon };