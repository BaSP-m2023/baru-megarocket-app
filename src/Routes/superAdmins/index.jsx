import React from 'react';
import { Route, Switch, useRouteMatch, Redirect } from 'react-router-dom';

import Layout from 'Components/Layout';
import Admins from 'Components/SuperAdmins/Admins';
import AdminsForm from 'Components/SuperAdmins/Admins/Form';
import SuperAdminProfile from 'Components/SuperAdmins/Profile';
import Home from 'Components/Layout/Home';

const routes = [
  {
    name: 'Home',
    path: '/user/super-admin/home'
  },
  {
    name: 'Admins',
    path: '/user/super-admin/admins'
  }
];

const SuperAdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />

        <Route exact path={`${url}/admins`} component={Admins} />
        <Route exact path={`${url}/admins/add`} component={AdminsForm} />
        <Route exact path={`${url}/admins/edit/:id`} component={AdminsForm} />

        <Route exact path={`${url}/profile/:id`} component={SuperAdminProfile} />

        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default SuperAdminRoutes;
