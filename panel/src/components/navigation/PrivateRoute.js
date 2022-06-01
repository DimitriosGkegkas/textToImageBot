import React from 'react';
import { Redirect, Route } from 'dva/router';
import { connect } from 'dva';


//Private route is used for protected routes that should only be accesible when the user is logged in
const PrivateRoute = (props) => {
    const { exact, path, redirect, token, component: Component, ...rest } = props;
    return (
        <Route exact={exact} path={path} render={(props) => {
            console.log(token)
            if (token !== '') {
                return <Component localtion={path} {...rest} />
            } else {
                return <Redirect to={redirect} />
            }
        }} />);
}

const mapStateToProps = (state, own) => ({
    ...own,
    token: state.authentication.token
});

export default connect(mapStateToProps)(PrivateRoute)
