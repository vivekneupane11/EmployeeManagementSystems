import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'assets/styles/basic.scss';
import 'bootstrap/dist/js/bootstrap.js';
import 'assets/icons/style.css';
import '../mainstyle.scss';
import SideBar from 'components/Sidebar';
import Navigation from 'components/Navigation';
import ViewUser from 'container/Users/ViewUser';
import ListDepart from 'container/Department/ListDepart';
import EmployeeHierarchy from 'container/Users/EmployeeHierarchy';
import ViewDocument from 'container/Document/ViewDocument/ViewDocument.jsx';
import { ProfileUpdate } from 'container/Users/ProfileUpdate';
import AdminHomePage from 'container/AdminHomePage';

export default function AdminDashboard() {
    return (
        <div>
            <Navigation />
            <div className="content d-flex flex-row">
                <SideBar />
                <div className="inner-content">
                    <div className="bg-white position-absolute col-11 shadow contents">
                        <Route
                            path="/employee"
                            exact
                            component={AdminHomePage}
                        />
                        <Switch>
                            <Route
                                path="/employee/viewuser/:id"
                                exact
                                component={ViewUser}
                            />

                            <Route
                                path="/employee/ehs"
                                exact
                                component={EmployeeHierarchy}
                            />
                            <Route
                                path="/employee/profile"
                                exact
                                component={ProfileUpdate}
                            />
                            <Route
                                path="/employee/listdept"
                                exact
                                component={ListDepart}
                            />
                            <Route
                                path="/employee/view-document/:value?"
                                component={ViewDocument}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
