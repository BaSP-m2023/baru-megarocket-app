import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Home from 'Components/Layout/Home';
import Layout from 'Components/Layout';

const AuthRoutes = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path={'/'} component={Home} />
        <Redirect to={`/`} />
      </Switch>
    </Layout>
  );
};

export default AuthRoutes;
