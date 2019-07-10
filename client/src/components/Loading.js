import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { WaveSpinner } from 'react-spinners-kit';

const Loading = ({ loading }) => {
  return (
    <LoaderPageWrapper className="Loading">
      <WaveSpinner
        className="Loading__spinner"
        size={50}
        loading={loading}
        color={'#939CE8'}
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

Loading.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default Loading;