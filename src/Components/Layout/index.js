import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
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
          <Route path="/activities" component={Activities} />
          <Route path="/admins" component={Admins} />
          <Route path="/classes" component={Classes} />
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
