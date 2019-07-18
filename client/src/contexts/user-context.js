import React, { createContext, useContext } from 'react';
import { useAuth } from './auth-context';

const UserContext = createContext(null);

function UserProvider(props) {
  const { user } = useAuth();
  return <UserContext.Provider value={user} {...props} />;
};

function useSession() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a UserProvider');
  }
  return context;
};

export { UserProvider, useSession };