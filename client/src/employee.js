import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './assets/styles/basic.scss';
import 'bootstrap/dist/js/bootstrap.js';
import './assets/icons/style.css';
import './mainstyle.scss';  

import CreateUsers from 'container/Users/CreateUsers';
import SideBar from './components/Sidebar';
import Navigation from './components/Navigation';
import ListUsers from './container/Users/ListUsers';
import ViewUser from 'container/Users/ViewUser';
import EditUser from 'container/Users/EditUser';
import ListDepart from 'container/Department/ListDepart';
import ViewDepart from 'container/Department/ViewDepart';
import EditDepart from 'container/Department/EditDepart';
import Document from 'container/Document/index.jsx';
import ViewDocument from 'container/Document/ViewDocument.jsx';
import EmployeeHierarchy from 'container/Users/EmployeeHierarchy';
import { ProfileUpdate } from 'container/Users/ProfileUpdate';

export default function App() {
    return (
        <div>
            <Router>
                <Navigation />
                <div className="content d-flex flex-row">
                    <SideBar />
                    <div className="inner-content">
                        <div className="bg-white position-absolute my-3 mx-5 col-11 shadow">
                            <Switch>
                                <Route path="/hr" exact component={ListUsers} />
                                <Route
                                    path="/hr/createusers"
                                    exact
                                    component={CreateUsers}
                                />
                                <Route
                                    path="/hr/viewuser/:id"
                                    exact
                                    component={ViewUser}
                                />
                                <Route path="/hr/document" exact component={Document} />
                                <Route
                                    path="/hr/view-document"
                                    exact
                                    component={ViewDocument}
                                />

                                <Route path="/hr/edituser" exact component={EditUser} />
                                <Route
                                    path="/hr/listdept"
                                    exact
                                    component={ListDepart}
                                />
                                <Route
                                    path="/hr/viewdept/:id"
                                    exact
                                    component={ViewDepart}
                                />
                                <Route
                                    path="/hr/editdept"
                                    exact
                                    component={EditDepart}
                                />
                                <Route
                                            path="/hr/ehs"
                                            exact
                                            component={EmployeeHierarchy}
                                />
                                <Route
                                            path="/hr/profile"
                                            exact
                                            component={ProfileUpdate}
                                />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        </div>
    );
}
