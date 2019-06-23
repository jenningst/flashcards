import React, { createContext, useReducer } from 'react';
import collectionReducer, { initialState } from '../reducers/collectionReducer';

const CollectionContext = createContext(initialState);

function CollectionProvider(props) {
  const [state, dispatch] = useReducer(collectionReducer, initialState);
  return (
    <CollectionContext.Provider value={ { state, dispatch } } >
      { props.children }
    </CollectionContext.Provider>
  );
}

export default CollectionContext;
export { CollectionProvider };