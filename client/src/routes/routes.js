import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';
import LandingPage from 'container/LandingPage/LandingPage.jsx';
import AdminDashboard from './AdminDashBoardRoute';
import EmployeeDashboard from './EmployeeDashBoardRoute';
import ForgotPassword from 'container/ForgotPassword';
import ResetPassword from 'container/ResetPassword';
import Login from 'container/Login';
import UsersDashboard from './UsersDashBoardRoute';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import AuthHelper from 'utils/auth';

const Auth = new AuthHelper();
const val = Auth.loggedIn();

const AuthorizedRouting = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <PrivateRoute path="/admin" component={AdminDashboard} />
                    <PrivateRoute path="/hr" component={EmployeeDashboard} />
                    <PrivateRoute path="/employee" component={UsersDashboard} />
                    <LandingPage>
                        <Route
                            path="/forgot-password"
                            exact
                            component={ForgotPassword}
                        />
                        <Route path="/" exact component={Login} />
                        <Route
                            path="/reset/:token/:email"
                            component={ResetPassword}
                        />
                    </LandingPage>
                </Switch>
            </div>
        </Router>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            val === true ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default AuthorizedRouting;
