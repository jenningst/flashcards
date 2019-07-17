import React, { createContext, useContext, useReducer } from 'react';
import { reducer, INITIAL_STATE } from '../reducers/pack-reducer';

const PackStateContext = createContext(null);
const PackDispatchContext = createContext(null);

// setup our pack provider
function PackProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  return (
    <PackStateContext.Provider value={state}>
      <PackDispatchContext.Provider value={dispatch}>
        {children}
      </PackDispatchContext.Provider>
    </PackStateContext.Provider>
  );
};

// setup our hook to use pack state
function usePackState() {
  const context = useContext(PackStateContext);
  if (context === undefined) {
    throw new Error('usePackState must be used within a PackProvider')
  }
  return context;
};

// setup our hook to use state dispatch
function usePackDispatch() {
  const context = useContext(PackDispatchContext);
  if (context === undefined) {
    throw new Error('usePackDispatch must be used within a PackProvider')
  }
  return context;
};

export { PackProvider, usePackState, usePackDispatch };