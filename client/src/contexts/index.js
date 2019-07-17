import React from 'react';
import { AuthProvider } from './auth-context';
import { UserProvider } from './user-context';
import { ApolloProvider } from 'react-apollo';

import { ApolloClient, HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

function AppProviders({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default AppProviders;