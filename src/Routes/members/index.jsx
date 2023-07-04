import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

import Layout from 'Components/Layout';
import Home from 'Components/Layout/Home';
import SubscriptionsMember from 'Components/Members/SubscriptionsMember';
import SubscribeActivities from 'Components/Members/SubscribeActivities';
import FormMemberSubscription from 'Components/Members/SubscribeActivities/FormMemberSubscription';
import MemberProfile from 'Components/Members/Profile';

const routes = [
  {
    name: 'Home',
    path: '/user/member/home'
  },
  {
    name: 'Activities',
    path: '/user/member/subscribe-class'
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

        <Route exact path={`${url}/subscribe-class`} component={SubscribeActivities} />
        <Route exact path={`${url}/subscribe-class/:id`} component={FormMemberSubscription} />
        <Route exact path={`${url}/subscriptions`} component={SubscriptionsMember} />

        <Route exact path={`${url}/profile/:id`} component={MemberProfile} />

        <Redirect to={`${url}/home`} />
      </Switch>
    </Layout>
  );
};

export default MembersRoutes;
