import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import FarmersList from '../FarmersList';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/farmers" component={FarmersList} />
      <Redirect exact path="/" to="/farmers" />
    </Switch>
  );
};

export default Router;
