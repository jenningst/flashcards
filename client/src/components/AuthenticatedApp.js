import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTE_CONFIG from '../constants/route-config';
import { PackProvider } from '../contexts/pack-context';
import PackContainer from '../containers/PackContainer';
import Dashboard from './Dashboard';
import ComposePack from './ComposePack';
import NoMatch from './NoMatch';

function AuthenticatedApp() {
  return (
    <PackProvider>
      <AppWrapper className="AuthenticatedApp">
        <Router>
          <Switch>
            <Route path={ROUTE_CONFIG.auth.CREATE_PACK} component={ComposePack} />
            <Route path={ROUTE_CONFIG.auth.PACK_CONTAINER} component={PackContainer} />
            <Route path={ROUTE_CONFIG.auth.DASHBOARD} component={Dashboard} />
          </Switch>
        </Router>
      </AppWrapper>
    </PackProvider>
  );
};

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.color.main.offWhite};
`;

export default AuthenticatedApp;