import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ReactComponent as DefaultAvatar } from '../components/icons/svg/user.svg';

const Avatar = user => {
  return (
    <AvatarWrapper
      className="Avatar"
      onClick={e => alert('you clicked the Avatar!')}
    >
      {user
        ? <DefaultAvatar 
            className="Avatar__image--unauth"
            alt="avatar"
            data-testid="avatar"
          />
        : <img
            className="Avatar__image--auth"
            src={user.profilePhotoUrl}
            alt="avatar"
            data-testid="avatar"
          />
      }
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

export default Avatar;