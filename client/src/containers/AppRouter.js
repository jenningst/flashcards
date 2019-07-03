import React from 'react';
import { usePackState } from '../contexts/packContext';

import Dashboard from '../components/Dashboard';
import CreatePack from '../components/ComposePack';
import PackRouter from './PackContainer';

function AppRouter() {
  const state = usePackState();
  const { displayCreatePack, packFilter } = state;

  return (
    <div className="app" style={ { height: '100%' } }>
      {displayCreatePack
        ? <CreatePack />
        : packFilter === 'SHOW_ALL'
          ? <Dashboard />
          : <PackRouter filter={packFilter}/>
      }
    </div>
  );
};

export default AppRouter;