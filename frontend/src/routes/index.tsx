import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import Repositories from '../pages/Repositories';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/repositories" component={Repositories} isPrivate />
  </Switch>
);

export default Routes;
