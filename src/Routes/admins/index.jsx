import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import Activities from 'Components/Admins/Activities';
import ActivitiesForm from 'Components/Admins/Activities/Form';
import Members from 'Components/Admins/Members';
import MembersForm from 'Components/Admins/Members/Form';
import Classes from 'Components/Admins/Classes';
import ClassesForm from 'Components/Admins/Classes/ClassForm';
import Subscriptions from 'Components/Admins/Subscriptions';
import SubscriptionsForm from 'Components/Admins/Subscriptions/Form';
// import Trainers from 'Components/Admins/Trainers';
// import TrainersForm from 'Components/Admins/Trainers/Form';
import Profile from 'Components/Admins/Profile';
import Layout from 'Components/Layout';

const routes = [
  {
    name: 'Activities',
    path: '/user/admin/activities'
  },
  {
    name: 'Classes',
    path: '/user/admin/classes'
  },
  {
    name: 'Members',
    path: '/user/admin/members'
  },
  {
    name: 'Profile',
    path: '/user/admin/profile'
  },
  {
    name: 'Subscriptions',
    path: '/user/admin/subscriptions'
  },
  {
    name: 'Trainers',
    path: '/user/admin/trainers'
  }
];

const AdminRoutes = () => {
  const { url } = useRouteMatch();
  return (
    <Layout routes={routes}>
      <Switch>
        <Route exact path={`${url}/activities`} component={Activities} />
        <Route exact path={`${url}/activities/add`} component={ActivitiesForm} />
        <Route exact path={`${url}/activities/edit/:id`} component={ActivitiesForm} />

        <Route exact path={`${url}/classes`} component={Classes} />
        <Route exact path={`${url}/classes/add`} component={ClassesForm} />
        <Route exact path={`${url}/classes/edit/:id`} component={ClassesForm} />

        <Route exact path={`${url}/members`} component={Members} />
        <Route exact path={`${url}/members/add`} component={MembersForm} />
        <Route exact path={`${url}/members/edit/:id`} component={MembersForm} />

        <Route exact path={`${url}/profile`} component={Profile} />

        <Route exact path={`${url}/subscriptions`} component={Subscriptions} />
        <Route exact path={`${url}/subscriptions/add`} component={SubscriptionsForm} />
        <Route exact path={`${url}/subscriptions/edit/:id`} component={SubscriptionsForm} />

        {/* <Route exact path={`${url}/trainers`} component={Trainers} />
        <Route exact path={`${url}/trainers/add`} component={TrainersForm} />
        <Route exact path={`${url}/trainers/edit/:id`} component={TrainersForm} /> */}

        {/* <Redirect to={`${url}/`} /> */}
      </Switch>
    </Layout>
  );
};

export default AdminRoutes;
