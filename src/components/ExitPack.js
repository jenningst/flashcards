import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function ExitPack(props) {
  const rootEl = React.useRef(document.createElement('div'));

  useEffect(() => {
    // get the parent element from the DOM
    const el = document.querySelector('modal-root');
    // mount the portal to the element
    el.appendChild(rootEl.current);
    // clean up after ourselves
    return el.current.remove();
  }, []);

  return (
    <div>
      I AM A FUCKING PORTAL!
    </div>
  );
};

ExitPack.propTypes = {
  
};

export default ExitPack;