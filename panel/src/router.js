import React from 'react';
import { Router, Switch } from 'dva/router';

import Login from './routes/login/Login';
import PublicRoute from './components/navigation/PublicRoute';
import PrivateRoute from './components/navigation/PrivateRoute';
import BaseLayout from './layouts/base-layout/BaseLayout';
import Dashboard from './routes/dashboard/Dashboard'
import Users from './routes/users/Users'
import BroadCast from './routes/broadcast/Broadcast';
import History from './routes/history/History';
import Url from './routes/url/Url';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <PublicRoute path="/login" component={Login} redirect='/' />
        <PrivateRoute exact path="/" content={Dashboard} component={BaseLayout} redirect='/login' />
        <PrivateRoute exact path="/users" content={Users} component={BaseLayout} redirect='/login' />
        <PrivateRoute exact path="/broadcast" content={BroadCast} component={BaseLayout} redirect='/login' />
        <PrivateRoute exact path="/history" content={History} component={BaseLayout} redirect='/login' />
        <PrivateRoute exact path="/change" content={Url} component={BaseLayout} redirect='/login' />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
