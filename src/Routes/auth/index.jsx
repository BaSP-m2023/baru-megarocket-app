import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Sign Up',
    path: '/auth/signup'
  },
  {
    name: 'Log In',
    path: '/auth/login'
  }
];

const AuthRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/login`} component={Login} />
        <Route exact path={`${url}/signup`} component={SignUp} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
