import React, { createContext, useContext } from 'react';
import Firebase from '../firebase/firebase-client';

const AuthContext = createContext(null);

function AuthProvider(props) {
  const firebase = new Firebase(); // create instance of firebase
  const data = { user: null, }; // initialize our data (for user)
  // provide firebase methods
  const registerWithEmail = (email, password) => firebase.doCreateUserWithEmailAndPassword(email, password);
  const login = (email, password) => firebase.doSignInWithEmailAndPassword(email, password);
  const signOut = () => firebase.doSignOut();
  const resetPasswordWithEmail = (email) => firebase.doResetPassword(email);
  const updatePasswordWithEmail = (password) => firebase.doUpdatePassword(password);

  return (
    <AuthContext.Provider value={
      { data,
        registerWithEmail,
        login,
        signOut,
        resetPasswordWithEmail,
        updatePasswordWithEmail,
      }
    } {...props} />
  );
};

// provides auth context to child components
/* ** IMPLEMENTED IN UserProvider ** */
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  return context;
};

export { AuthProvider, useAuth };