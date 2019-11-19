import React from 'react';
import { Switch, Route } from 'react-router-dom';
import 'assets/styles/basic.scss';
import 'bootstrap/dist/js/bootstrap.js';
import 'assets/icons/style.css';
import '../mainstyle.scss';
import CreateUsers from 'container/Users/CreateUsers';
import SideBar from 'components/Sidebar';
import Navigation from 'components/Navigation';
import CreateDepart from 'container/Department/CreateDepart';
import ListUsers from 'container/Users/ListUsers';
import ViewUser from 'container/Users/ViewUser';
import EditUser from 'container/Users/EditUser';
import ListDepart from 'container/Department/ListDepart';
import ViewDepart from 'container/Department/ViewDepart';
import EditDepart from 'container/Department/EditDepart';
import EmployeeHierarchy from 'container/Users/EmployeeHierarchy';
import UploadDocument from 'container/Document/index.jsx';
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
                    <div className="bg-white position-absolute my-3 mx-5 col-11 shadow">
                        <Switch>
                            <Route path="/hr" exact component={AdminHomePage} />
                            <Route path="/hr/listuser" exact component={ListUsers} />
                            <Route
                                path="/hr/createusers"
                                exact
                                component={CreateUsers}
                            />
                            <Route
                                path="/hr/createdepart"
                                exact
                                component={CreateDepart}
                            />
                            <Route
                                path="/hr/viewuser/:id"
                                exact
                                component={ViewUser}
                            />
                            <Route
                                path="/hr/edituser"
                                exact
                                component={EditUser}
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
                                path="/hr/document"
                                exact
                                component={UploadDocument}
                            />
                            <Route
                                path="/hr/view-document/:value?"
                                component={ViewDocument}
                            />
                        </Switch>
                    </div>
                </div>
            </div>
        </div>
    );
}
