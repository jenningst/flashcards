import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ROUTE_CONFIG from '../constants/route-config';
import ForgotPassword from './ForgotPassword';
import SignUp from  './SignUp';
import Login from './Login';

const UnAuthenticatedApp = () => {
  return (
    <AppWrapper className="UnAuthenticatedApp">
      <Router>
        <Switch>
          <Route path={ROUTE_CONFIG.unauth.FORGOT_PASSWORD} component={ForgotPassword} />
          <Route path={ROUTE_CONFIG.unauth.SIGN_UP} component={SignUp} />
          <Route path={ROUTE_CONFIG.unauth.LOGIN} component={Login} />
        </Switch>
      </Router>
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: ${props => props.theme.color.background.offWhite};
`;

export default UnAuthenticatedApp;