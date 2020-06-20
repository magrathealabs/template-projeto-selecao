import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login';
import App from './pages/App';

import { isAuthenticated } from './services/auth';
import Oauth from './pages/Oauth';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (isAuthenticated() ? <Component {...props} /> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />)}
    />
);

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Login} />
            <PrivateRoute path='/app' component={App} />
            <Route path='/oauth' component={Oauth} />
            <Route path='*' component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;
