import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Avatar = user => {
  return (
    <AvatarWrapper className="Avatar">
      <img
        className="Avatar__image"
        src={user.profilePhotoUrl}
        alt="avatar-image"
        data-testid="avatar-image"
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
  user: PropTypes.object.isRequired,
};

export default Avatar;