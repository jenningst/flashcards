import React, { useContext } from 'react';
import CollectionContext, { CollectionProvider } from '../contexts/collectionContext';
import Dashboard from '../components/Dashboard';
import Pack from '../components/Pack';

function FlashcardContainer() {
  const { state } = useContext(CollectionContext);
  const { collection } = state;

  return (
    <React.Fragment>
      {collection === ''
        ? <Dashboard />
        : <Pack pack={collection}/>
      }
    </React.Fragment>
  );
};

export default FlashcardContainer;