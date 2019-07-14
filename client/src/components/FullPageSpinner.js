import React from 'react';
import PropTypes from 'prop-types';
import { WaveSpinner } from 'react-spinners-kit';

const FullPageSpinner = ({ loading }) => {
  return (
    <div
      className="FullPageSpinner"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: '#fcfbfc'
      }}
    >
      <WaveSpinner
        className="FullPageSpinner__spinner"
        size={30}
        loading={loading}
        color={'#939CE8'}
      />
    </div>
  );
};

FullPageSpinner.propTypes = {
  loading: PropTypes.bool,
};

FullPageSpinner.defaultProps = {
  loading: true,
}

export default FullPageSpinner;