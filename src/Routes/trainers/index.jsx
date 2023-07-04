import Layout from 'Components/Layout';
import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import Home from 'Components/Layout/Home';
import TrainerProfile from 'Components/Trainers/Profile';

const routes = [
  {
    name: 'Home',
    path: '/user/trainer/home'
  }
];

const TrainerRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />

        <Route exact path={`${url}/profile/:id`} component={TrainerProfile} />

        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default TrainerRoutes;
