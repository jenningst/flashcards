import { useState, useEffect } from 'react';

function useKeyPress(targetKeycode) {
  const [keyPressed, setKeyPressed] = useState(false);
  // handler for checking valid keydown
  function downHandler({ keyCode }) {
    if (keyCode === targetKeycode) {
      setKeyPressed(true);
    }
  };
  // handler for checking valid keyup
  function upHandler({ keyCode }) {
    if (keyCode === targetKeycode) {
      setKeyPressed(false);
    }
  };

  // add and cleanup event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    // cleanup
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    }
  }, []);

  return keyPressed;
};

export { useKeyPress };