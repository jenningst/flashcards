import React, { useState } from 'react';
import { usePackState } from '../contexts/packContext';

import Dashboard from '../components/Dashboard';
import CreatePack from '../components/CreatePack';
import PackRouter from './PackRouter';

function AppRouter() {
  const state = usePackState();
  const { displayCreatePack, packFilter } = state;


  /* TODO: ** temporary hard-coded packs; put into state later ***** */
  const tempPacks = [
    { id: 2, name: 'JavaScript', pack: 'javscript', image: '', count: 1000,},
    { id: 3, name: 'CSS',  pack: 'css', image: '', count: 999,},
    { id: 4, name: 'HTML',  pack: 'html', image: '', count: 150,},
    { id: 5, name: 'React',  pack: 'react', image: '', count: 42,},
    { id: 6, name: 'Theory',  pack: 'theory', image: '', count: 1,},
    { id: 7, name: 'Angular',  pack: 'angular', image: '', count: 0,},
  ];
  // temporary state to hold packs so we can append;
  const [ packs, setPacks ] = useState(tempPacks);
  // temporary function to add new packs
  function addPack(name) {
    const lastID = packs[packs.length - 1].id;
    let newPack = {
      id: lastID + 1,
      name,
      pack: name.toLowerCase(),
      image: '',
      count: 0,
    };
    setPacks([ ...packs, newPack ]);
  };


  return (
    <div className="app" style={ { height: '100%' } }>
      {displayCreatePack
        ? <CreatePack addPack={addPack} />
        : packFilter === 'SHOW_ALL'
          ? <Dashboard allPacks={packs} />
          : <PackRouter />
      }
    </div>
  );
};

export default AppRouter;