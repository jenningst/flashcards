import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from '../themes/theme';
import { PackProvider } from '../contexts/packContext';

import { ApolloClient, HttpLink } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Dashboard from './Dashboard';
import ComposePack from './ComposePack';
import PackContainer from '../containers/PackContainer';

const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ApolloProvider client={apolloClient}>
      <PackProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <div className="app">
            <Router>
              <Route path="/" exact component={Dashboard} />
              <Route path="/create-pack" component={ComposePack} />
              <Route path="/pack/:id" component={PackContainer} />
            </Router>
          </div>
        </ThemeProvider>
      </PackProvider>
    </ApolloProvider>
  );
};

export default App;
