import React from 'react';
import PackHome from '../components/PackHome';
import Pack from '../components/Pack';
import ComposeFlashcard from '../components/ComposeFlashcard';
import { usePackState } from '../contexts/packContext';

import { data } from '../constants/sampleQuestions';

function PackRouter() {
  const state = usePackState();
  const { packMode, packFilter } = state;
  const questions = data[packFilter.toLowerCase()].questions;

  return (
    <React.Fragment>
      {packMode === ''
        ? <PackHome data={questions} packName={packFilter}/>
        : <Pack mode={packMode} data={questions} />
      }
    </React.Fragment>
  );
};

export default PackRouter;