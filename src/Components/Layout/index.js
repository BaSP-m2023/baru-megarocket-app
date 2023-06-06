import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Activities from '../Activities';
import Admins from '../Admins/index';
import Classes from '../Classes';
import ClassForm from '../Classes/ClassForm';
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
          <Route path="/admins" component={Admins} />
          <Route exact path="/classes" component={Classes} />
          <Route exact path="/classes/add" component={ClassForm} />
          <Route exact path="/classes/edit/:id" component={ClassForm} />
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
