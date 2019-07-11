import React, { createContext, useContext } from 'react';
import Firebase from '../firebase/firebase';

const FirebaseContext = createContext(null);

// setup our pack provider
function FirebaseProvider({ children }) {
  const firebase = new Firebase();
  return (
    <FirebaseContext.Provider firebase={firebase}>
      {children}
    </FirebaseContext.Provider>
  );
};

// setup our hook to use firebase
function useFirebase() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};

export { FirebaseProvider, useFirebase };