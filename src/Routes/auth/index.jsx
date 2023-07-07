import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';
import Layout from 'Components/Layout';
import ForgotPassword from 'Components/Auth/ForgotPassword';

const routes = [
  {
    name: 'Home',
    path: '/'
  }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/login`} component={Login} />
        <Route exact path={`${url}/signup`} component={SignUp} />
        <Route exact path={`${url}/forgotPassword`} component={ForgotPassword} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
