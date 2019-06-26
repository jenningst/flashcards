import React from 'react';
import { usePackState } from '../contexts/packContext';
import { fakeDatabase } from '../api'

import PackHome from '../components/PackHome';
import Pack from '../components/Pack';

function PackRouter() {
  // context
  const state = usePackState();
  const { packMode, packFilter } = state;
  // state
  const results = fakeDatabase[packFilter.toLowerCase()];
  
  return (
    <React.Fragment>
      {packMode === ''
        ? <PackHome data={results} packName={packFilter}/>
        : <Pack mode={packMode} data={results} />
      }
    </React.Fragment>
  );
};

export default PackRouter;