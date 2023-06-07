import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Activities from '../Activities';
import Admins from '../Admins';
import AdminsForm from '../Admins/Form';
import ActivitiesForm from '../Activities/Form';
import Classes from '../Classes';
import ClassForm from '../Classes/ClassForm';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SubscriptionsForm from '../Subscriptions/Form';
import SuperAdmins from '../SuperAdmins';
import Trainers from '../Trainers';
import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';
import TrainerForm from '../Trainers/Form';

function Layout() {
  return (
    <Router>
      <div className={styles.container}>
        <Header />
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
          <Route path="/members" component={Members} />
          <Route exact path="/subscriptions" component={Subscriptions} />
          <Route path="/subscriptions/edit/:id" component={SubscriptionsForm} />
          <Route path="/subscriptions/add" component={SubscriptionsForm} />
          <Route path="/super-admins" component={SuperAdmins} />
          <Route exact path="/trainers" component={Trainers} />
          <Route path="/trainers/add" component={TrainerForm} />
          <Route path="/trainers/edit/:id" component={TrainerForm} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
