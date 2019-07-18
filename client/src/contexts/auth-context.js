import React, { createContext, useContext } from 'react';
import firebase from '../firebase/firebase-client';
import { useAuthState } from 'react-firebase-hooks/auth';
import FullPageSpinner from '../components/FullPageSpinner';

const AuthContext = createContext(null);

function AuthProvider(props) {
  const [user, initialising, error] = useAuthState(firebase.auth());

  if (initialising) {
    return <FullPageSpinner loading={true} />;
  }
  if (error) {
    throw new Error(`Error in firebase.auth(): ${error.message}`)
  }

  // TODO: getToken
  /* 
  function handleUserResponse({ user: {token, ...user}}) {
    window.localStorage.setItem(localStorageKey, token);
  }

  const localStorageKey = '__pack_token__';
  function getToken() {
    // get token from local storage
    return window.localStorage.getItem(localStorageKey);
  }

  function logout() {
    // remove token from local storage
    window.localStorage.removeItem(localStorageKey);
  }

  async function getUser() {
    const token = getToken();
    if (!token) {
      return Promise.resolve(null);
    }
    
    try {
      let user = await firebase.getUser(user);
      return user;
    } catch(err) {
      return Promise.reject(err);
    }
    
  }
  */

  const createUserWithEmail = async (email, password) =>
    await firebase.auth().createUserWithEmailAndPassword(email, password);

  const loginWithEmail = async (email, password) =>
    await firebase.auth().signInWithEmailAndPassword(email, password);

  const logOut = async () => await firebase.auth().signOut();

  const sendPasswordResetEmail = async (email) =>
    await firebase.auth().sendPasswordResetEmail(email);
  
  const confirmPasswordReset = async (code, newPassword) =>
    await firebase.auth().Auth.confirmPasswordReset(code, newPassword);

  return (
    <AuthContext.Provider value={{ 
      user,
      initialising,
      error,
      createUserWithEmail,
      loginWithEmail,
      logOut,
      sendPasswordResetEmail,
      confirmPasswordReset,
    }} {...props} />
  );
};

// async function createUserWithEmail(email, password) {
//   try {
//     await firebase.auth().createUserWithEmailAndPassword(email, password);
//   } catch (err) {
//     console.log(err);
//     return Promise.reject(err);
//   }
// };

// async function loginWithEmail(email, password) {
//   try {
//     await firebase.auth().signInWithEmailAndPassword(email, password);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// async function logOut() {
//   try {
//     await firebase.auth().signOut(); 
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// async function sendPasswordWithEmail(email) {
//   try {
//     await firebase.auth().sendPasswordResetEmail(email);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

// async function confirmPasswordReset(code, newPassword) {
//   try {
//     await firebase.auth().Auth.confirmPasswordReset(code, newPassword);
//   } catch (err) {
//     return Promise.reject(err);
//   }
// };

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthContext');
  }
  return context;
};

export {
  AuthProvider,
  useAuth,
  // createUserWithEmail,
  // loginWithEmail,
  // logOut,
  // sendPasswordWithEmail,
  // confirmPasswordReset,
};