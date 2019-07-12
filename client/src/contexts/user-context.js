import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './auth-context';

const UserContext = createContext(null);

// receives the user from auth-context and passes it through a provider; 
/* ** IMPLEMENTED IN AppProvider ** */
function UserProvider(props) {
  const { data: { user }} = useAuth(); // call hook from AuthProvider (which should be
  // higher in the tree than UserProvider); use the user property for the 
  // UserProvider
  return <UserContext.Provider value={user} {...props} />;
};

/* ** IMPLEMENTED IN App ** */
// used at the top-level of App to provide the user as high up in the tree as
// possible
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useUser };