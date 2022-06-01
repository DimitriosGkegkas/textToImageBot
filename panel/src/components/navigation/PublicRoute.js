import React from 'react';
import { connect } from 'dva';
import { Redirect, Route } from 'dva/router';



//Public route is used for routes that should only be accesible when the user is not logged in
const PublicRoute = (props) => {
    const { exact, path, redirect, token, component: Component, ...rest } = props;
    return (
        <Route exact={exact} path={path} render={(props) => {
            if (token === '') {
                return <Component localtion={path} {...rest} />
            } else {
                return <Redirect to={redirect} />
            }
        }} />);
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    token: state.authentication.token
});

export default connect(mapStateToProps)(PublicRoute)
