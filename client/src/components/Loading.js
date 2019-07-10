import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { WaveSpinner } from 'react-spinners-kit';

const Loading = ({ loading }) => {
  return (
    <LoaderPageWrapper className="Loading">
      <StyledWaveSpinner
        className="Loading__spinner"
        size={50}
        loading={loading}
        color={props => props.theme.color.main.secondary}
      />
    </LoaderPageWrapper>
  );
};

const LoaderPageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: ${props => props.theme.color.main.offWhite};
`;

const StyledWaveSpinner = styled(WaveSpinner)`
  color: ${props => props.theme.color.main.primary};
`;

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;