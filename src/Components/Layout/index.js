import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
import SuperAdminsForm from '../SuperAdmins/Form';
import Trainers from '../Trainers';

import Home from '../Home/index';
import Header from '../Header/index';
import Footer from '../Footer/index';
import styles from './layout.module.css';

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
          <Route path="/subscriptions" component={Subscriptions} />
          <Route exact path="/super-admins" component={SuperAdmins} />
          <Route exact path="/super-admins/add" component={SuperAdminsForm} />
          <Route exact path="/super-admins/edit/:id" component={SuperAdminsForm} />
          <Route path="/trainers" component={Trainers} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
