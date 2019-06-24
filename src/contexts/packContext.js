import React, { createContext, useContext, useReducer } from 'react';
import packReducer, { initialState } from '../reducers/packReducer';

const PackStateContext = createContext();
const PackDispatchContext = createContext();

function PackProvider({ children }) {
  const [state, dispatch] = useReducer(packReducer, initialState);
  return (
    <PackStateContext.Provider value={state}>
      <PackDispatchContext.Provider value={dispatch}>
        {children}
      </PackDispatchContext.Provider>
    </PackStateContext.Provider>
  );
};

function usePackState() {
  const context = useContext(PackStateContext);
  if (context === undefined) {
    throw new Error('usePackState must be used within a PackProvider')
  }
  return context;
};

function usePackDispatch() {
  const context = useContext(PackDispatchContext);
  if (context === undefined) {
    throw new Error('usePackDispatch must be used within a PackProvider')
  }
  return context;
};

export { PackProvider, usePackState, usePackDispatch };