import React from 'react';
import PropTypes from 'prop-types';
import { usePackState } from '../contexts/packContext';

import PackHome from '../components/PackHome';
import Pack from '../components/Pack';
import ComposeFlashcard from '../components/ComposeFlashcard';

const PackContainer = () => {
  const state = usePackState();
  const { packMode } = state;

  return (
    <React.Fragment>
      {packMode && packMode === 'REVIEW_MODE'
        ? <Pack pack={"javascript"}/>
        : packMode === 'WRITE_MODE'
          ? <ComposeFlashcard />
          : <PackHome />
      }
    </React.Fragment>
  );
};

export default PackContainer;