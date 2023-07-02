import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'Components/Layout/Home';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Home',
    path: '/'
  },
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
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Redirect to={`/`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
