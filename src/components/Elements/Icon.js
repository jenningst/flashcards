import React from 'react';
import PropTypes from 'prop-types';

const shortid = require('shortid');

const Icon = ({ icon, width, height, color, onClick, className }) => {
  const paths = icon.paths.map((path, index) => (
    <path
      key={shortid.generate()}
      d={path}
      fill={color}
    />
  ));

  return (
    <svg
      width={`${width}rem`}
      height={`${height}rem`}
      viewBox={icon.viewBox}
      onClick={onClick}
      className={className}
    >
      {paths}
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.shape({
    title: PropTypes.string.isRequired,
    viewBox: PropTypes.string,
    paths: PropTypes.array.isRequired,
  }).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  color: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Icon.defaultProps = {
  color: '#FFFFFF',
  width: 2,
  height: 2,
  className: 'icon',
};

export { Icon };
