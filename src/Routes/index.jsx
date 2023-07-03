import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'Components/Home/index';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import Loader from 'Components/Shared/Loader';
import styles from './layout.module.css';
import PrivateRoute from './privateRoute';

const Admins = lazy(() => import('./admin'));
const AdminsForm = lazy(() => import('./admin/form'));
const AdminProfile = lazy(() => import('./admin/profile'));
const Activities = lazy(() => import('./activity'));
const ActivitiesForm = lazy(() => import('./activity/form'));
const Classes = lazy(() => import('./class'));
const ClassForm = lazy(() => import('./class/form'));
const Members = lazy(() => import('./member'));
const MemberForm = lazy(() => import('./member/form'));
const MemberProfile = lazy(() => import('./member/profile'));
const Schedule = lazy(() => import('./schedule'));
const SubscribeActivities = lazy(() => import('./member-logged/subscribeActivities'));
const FormMemberSubscription = lazy(() => import('./member-logged/formMemberSubscription'));
const Subscriptions = lazy(() => import('./subscription'));
const SubscriptionsForm = lazy(() => import('./subscription/form'));
const SuperAdminsProfile = lazy(() => import('./super-admin/profile'));
const Trainers = lazy(() => import('./trainer'));
const TrainerForm = lazy(() => import('./trainer/form'));
const TrainerProfile = lazy(() => import('./trainer/profile'));
const Login = lazy(() => import('./login'));
const SubscriptionsMember = lazy(() => import('./subscriptions-members'));
const SignUp = lazy(() => import('./signup'));

const Layout = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Suspense fallback={Loader}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <PrivateRoute exact path="/admins" role="SUPER_ADMIN" component={Admins} />
            <PrivateRoute path="/admins/add" role="SUPER_ADMIN" component={AdminsForm} />
            <PrivateRoute path="/admins/edit/:id" role="SUPER_ADMIN" component={AdminsForm} />
            <PrivateRoute
              path="/user/super_admin/profile"
              role="SUPER_ADMIN"
              component={SuperAdminsProfile}
            />
            <PrivateRoute path="/user/admin/profile" role="ADMIN" component={AdminProfile} />
            <PrivateRoute path="/activities" role="ADMIN" exact component={Activities} />
            <PrivateRoute path="/activities/add" role="ADMIN" component={ActivitiesForm} />
            <PrivateRoute path="/activities/edit/:id" role="ADMIN" component={ActivitiesForm} />
            <PrivateRoute exact path="/classes" role="ADMIN" component={Classes} />
            <PrivateRoute exact path="/classes/add" role="ADMIN" component={ClassForm} />
            <PrivateRoute exact path="/classes/edit/:id" role="ADMIN" component={ClassForm} />
            <PrivateRoute exact path="/members" role="ADMIN" component={Members} />
            <PrivateRoute path="/members/add" role="ADMIN" component={MemberForm} />
            <PrivateRoute path="/members/edit/:id" role="ADMIN" component={MemberForm} />
            <PrivateRoute exact path="/subscriptions" role="ADMIN" component={Subscriptions} />
            <PrivateRoute path="/subscriptions/add" role="ADMIN" component={SubscriptionsForm} />
            <PrivateRoute
              path="/subscriptions/edit/:id"
              role="ADMIN"
              component={SubscriptionsForm}
            />
            <PrivateRoute exact path="/trainers" role="ADMIN" component={Trainers} />
            <PrivateRoute path="/trainers/add" role="ADMIN" component={TrainerForm} />
            <PrivateRoute path="/trainers/edit/:id" role="ADMIN" component={TrainerForm} />
            <PrivateRoute path="/user/member/profile/:id" role="MEMBER" component={MemberProfile} />
            <PrivateRoute path="/user/member/schedule/:id" role="MEMBER" component={Schedule} />
            <PrivateRoute
              path="/user/trainer/profile/:id"
              role="TRAINER"
              component={TrainerProfile}
            />
            <PrivateRoute
              exact
              path="/user/members/subscribe-class"
              role="MEMBER"
              component={SubscribeActivities}
            />
            <PrivateRoute
              path="/user/members/subscribe-class/:id"
              role="MEMBER"
              component={FormMemberSubscription}
            />

            <PrivateRoute
              path="/user/members/subscriptions"
              role="MEMBER"
              component={SubscriptionsMember}
            />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
