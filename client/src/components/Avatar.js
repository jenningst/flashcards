import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { logOut } from '../contexts/auth-context';
import { ReactComponent as DefaultAvatar } from '../components/icons/svg/user.svg';

const Avatar = ({ user, history }) => {
  const handleLogout = () => {
    console.log('logout');
    logOut();
    history.push('/');
  };

  return (
    <AvatarWrapper
      className="Avatar"
      onClick={handleLogout}
    >
      <DefaultAvatar 
        className="Avatar__image--unauth"
        alt="avatar"
        data-testid="avatar-unauth"
      />
    </AvatarWrapper>
  );
};

const AvatarWrapper = styled.div`
  height: 2rem;
  width: 2rem;
  border-radius: 50%;

  img {
    height: 100%;
    width: 100%;
  }
`;

Avatar.propTypes = {
  user: PropTypes.object,
};

export default withRouter(Avatar);