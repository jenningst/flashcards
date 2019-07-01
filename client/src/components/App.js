import React, { useContext } from 'react';
import { PackProvider } from '../contexts/packContext';
import ThemeContext, { ThemeProvider } from '../contexts/themeContext';

import { ApolloClient, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import AppRouter from '../containers/AppRouter';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

function App() {
  const theme = useContext(ThemeContext);

  return (
    <ApolloProvider client={apolloClient}>
      <PackProvider>
        <ThemeProvider value={theme}>
          <AppRouter />
        </ThemeProvider>
      </PackProvider>
    </ApolloProvider>
  );
};

export default App;
