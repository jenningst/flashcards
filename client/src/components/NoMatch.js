import React from 'react';

const NoMatch = ({ match }) => {
  return (
    <div>
      404! {match.params.id}
    </div>
  );
};

export default NoMatch;