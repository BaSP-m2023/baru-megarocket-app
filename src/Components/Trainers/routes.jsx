import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const TrainerRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/trainers" exact></Route>
        <Route path="/trainers/add"></Route>
      </Switch>
    </Router>
  );
};

export default TrainerRoutes;
