import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { WhisperSpinner } from 'react-spinners-kit';

const Loading = ({ loading }) => {
  return (
    <StyledWhisperSpinner
      size={50}
      loading={true}
    />
  );
};

const StyledWhisperSpinner = styled(WhisperSpinner)`
  color: ${props => props.theme.color.main.primary}
`;

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;