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

const mockData = {
  name: 'JavaScript',
  image: {
    alt: 'javascript icon',
    src: './assets/javascript.svg',
  },
  cards: [
    {
      _id: '5d1b0ff64d5f0d06f9d06476',
      text: 'test question',
      answer: 'test answer',
      user_id: '1',
      pack_id: '5d15c13c9d26a305dfce6da9'
    }
  ]
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <ApolloProvider client={apolloClient}>
      <PackProvider>
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
          <div className="app" style={{ height: '100vh', width: '100vw' }}>
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
