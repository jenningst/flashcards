import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { PackProvider } from '../contexts/pack-context';
import { useUser } from '../contexts/user-context';
import { darkTheme, lightTheme } from '../themes/theme';

import Dashboard from './Dashboard';
import ComposePack from './ComposePack';
import PackContainer from '../containers/PackContainer';
import Login from './Login';
import SignUp from './SignUp';
import ButtonViewer from './ButtonViewer';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const user = useUser();

  return (
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
              <Route path='/btn-tester' component={ButtonViewer} />
            </Switch>
          </Router>
        </AppWrapper>
      </ThemeProvider>
    </PackProvider>
  );
};

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.color.main.offWhite};
`;

export default App;
