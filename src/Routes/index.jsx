import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from 'Components/Home/index';
import Header from 'Components/Header/index';
import Footer from 'Components/Footer/index';
import Loader from 'Components/Shared/Loader';
import styles from './layout.module.css';
import SubscribeActivities from 'Components/MemberLogged/SubscribeActivities';
import FormMemberSubscription from 'Components/MemberLogged/FormMemberSubscription';

const Admins = lazy(() => import('./admin'));
const AdminsForm = lazy(() => import('./admin/form'));
const Activities = lazy(() => import('./activity'));
const ActivitiesForm = lazy(() => import('./activity/form'));
const Classes = lazy(() => import('./class'));
const ClassForm = lazy(() => import('./class/form'));
const Members = lazy(() => import('./member'));
const MemberForm = lazy(() => import('./member/form'));
const Subscriptions = lazy(() => import('./subscription'));
const SubscriptionsForm = lazy(() => import('./subscription/form'));
const SuperAdmins = lazy(() => import('./super-admin'));
const SuperAdminsForm = lazy(() => import('./super-admin/form'));
const Trainers = lazy(() => import('./trainer'));
const TrainerForm = lazy(() => import('./trainer/form'));
const Login = lazy(() => import('./login'));

const Layout = () => {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
        <Suspense fallback={Loader}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/admins" component={Admins} />
            <Route path="/admins/add" component={AdminsForm} />
            <Route path="/admins/edit/:id" component={AdminsForm} />
            <Route path="/activities" exact component={Activities} />
            <Route path="/activities/add" component={ActivitiesForm} />
            <Route path="/activities/edit/:id" component={ActivitiesForm} />
            <Route exact path="/classes" component={Classes} />
            <Route exact path="/classes/add" component={ClassForm} />
            <Route exact path="/classes/edit/:id" component={ClassForm} />
            <Route exact path="/members" component={Members} />
            <Route path="/members/add" component={MemberForm} />
            <Route path="/members/edit/:id" component={MemberForm} />
            <Route exact path="/user/members/subscribe-class" component={SubscribeActivities} />
            <Route path="/user/members/subscribe-class/:id" component={FormMemberSubscription} />
            <Route exact path="/super-admins" component={SuperAdmins} />
            <Route exact path="/super-admins/add" component={SuperAdminsForm} />
            <Route exact path="/super-admins/edit/:id" component={SuperAdminsForm} />
            <Route exact path="/subscriptions" component={Subscriptions} />
            <Route path="/subscriptions/edit/:id" component={SubscriptionsForm} />
            <Route path="/subscriptions/add" component={SubscriptionsForm} />
            <Route exact path="/trainers" component={Trainers} />
            <Route path="/trainers/add" component={TrainerForm} />
            <Route path="/trainers/edit/:id" component={TrainerForm} />
            <Route path="/login" component={Login} />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
};

export default Layout;
