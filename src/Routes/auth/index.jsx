import React from 'react';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';

import Login from 'Components/Auth/Login';
import SignUp from 'Components/Auth/SignUp';
import Layout from 'Components/Layout';
import ForgotPassword from 'Components/Auth/ForgotPassword';
import NewPassword from 'Components/Auth/ResetPassword';
import NotFound from 'Components/NotFound';
import NotAllowed from 'Components/Auth/NotAllowed';

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
        <Route exact path={`${url}/newPassword`} component={NewPassword} />
        <Route exact path={`${url}/not-found`} component={NotFound} />
        <Route exact path={`${url}/not-allowed`} component={NotAllowed} />
        <Redirect to={`${url}/login`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
