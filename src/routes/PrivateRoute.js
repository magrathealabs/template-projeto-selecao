import React from 'react';

import { isAuthenticated } from '../hooks/Auth';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() 
    ? (
        <Component {...props} />
      )
    :
      (
        <Redirect to={{ pathname: "/", state: { from: props.location }}} />
      )
  )} />
)


