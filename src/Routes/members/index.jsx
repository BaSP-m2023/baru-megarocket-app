import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import Layout from 'Components/Layout';
import Home from 'Components/Layout/Home';
import SubscriptionsMember from 'Components/Members/SubscriptionsMember';
import SubscribeActivities from 'Components/Members/SubscribeActivities';
import Schedule from 'Components/Shared/Schedule';
import MemberProfile from 'Components/Members/Profile';

const routes = [
  {
    name: 'Home',
    path: '/user/member/home'
  },
  {
    name: 'Schedule',
    path: '/user/member/schedule'
  },
  {
    name: 'Activities',
    path: '/user/member/activities'
  },
  {
    name: 'Subscriptions',
    path: '/user/member/subscriptions'
  }
];

const MembersRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/home`} component={Home} />

        <Route exact path={`${url}/activities`} component={SubscribeActivities} />
        <Route exact path={`${url}/subscriptions`} component={SubscriptionsMember} />
        <Route exact path={`${url}/schedule`} component={Schedule} />
        <Route exact path={`${url}/profile/:id`} component={MemberProfile} />

        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default MembersRoutes;
