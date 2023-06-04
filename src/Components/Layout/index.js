import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Activities from '../Activities';
import Admins from '../Admins';
import AdminsForm from '../Admins/Form';
import Classes from '../Classes';
import Members from '../Members';
import Subscriptions from '../Subscriptions';
import SuperAdmins from '../SuperAdmins';
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
          <Route exact path="/admins" component={Admins} />
          <Route path="/admins/add" component={AdminsForm} />
          <Route path="/admins/edit/:id" component={AdminsForm} />
          <Route path="/classes" component={Classes} />
          <Route path="/members" component={Members} />
          <Route path="/subscriptions" component={Subscriptions} />
          <Route path="/super-admins" component={SuperAdmins} />
          <Route path="/trainers" component={Trainers} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default Layout;
