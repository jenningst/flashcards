import React, { useState } from 'react';
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { PackProvider } from '../contexts/pack-context';
import { FirebaseProvider } from '../contexts/firebase-context';
import { ApolloProvider } from 'react-apollo';

import { darkTheme, lightTheme } from '../themes/theme';
import { ApolloClient, HttpLink } from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';

import Dashboard from './Dashboard';
import ComposePack from './ComposePack';
import PackContainer from '../containers/PackContainer';
import Login from './Login';
import SignUp from './SignUp';

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <FirebaseProvider>
      <ApolloProvider client={client}>
        <PackProvider>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <AppWrapper className="App">
              <Router>
                <Switch>
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/forgot-password" component={SignUp} />
                  <Route path="/home" exact component={Dashboard} />
                  <Route path="/create-pack" component={ComposePack} />
                  <Route path="/pack/:id" component={PackContainer} />
                </Switch>
              </Router>
            </AppWrapper>
          </ThemeProvider>
        </PackProvider>
      </ApolloProvider>
    </FirebaseProvider>
  );
};

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.color.main.offWhite};
`;

export default App;
