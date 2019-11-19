import React from 'react';
const EmployeeHierarchySystem = props => {
    const { alldata } = props;

    const adminHierarchy = () => {
        if (alldata) {
            return alldata.map(emp => {
                if (emp.role === 'admin') {
                    return (
                        <div className="card">
                            <div className="admin-image">
                                <img
                                    className="adminimg"
                                    src={emp.imagePath}
                                    alt="no availale"
                                />
                            </div>
                            <div className="card-body">
                                <div className="name">
                                    {ellipsis(emp.username, 15)}
                                </div>
                                <div className="info">
                                    <div className="detail">
                                        <i className="icons icon-user" />
                                        <div className="detail-text">
                                            {emp.role}
                                        </div>
                                    </div>
                                    {emp.contact && <div className="detail">
                                        <i className="icons icon-phone" />
                                        <div className="detail-text">
                                            {emp.contact}
                                        </div>
                                    </div>}
                                    <div className="detail">
                                        <i className="icons icon-email" />
                                        <p className="detail-text">
                                            {ellipsis(emp.email, 22)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }
    };

    const hrHierarchy = () => {
        if (alldata) {
            return alldata.map(hremp => {
                if (hremp.role === 'HR') {
                    return (
                        <div className="card">
                            <div className="hr-image">
                                <img
                                    className="hrimg"
                                    src={hremp.imagePath}
                                    alt="no availale"
                                />
                            </div>
                            <div className="card-body">
                                <div className="name">
                                    {ellipsis(hremp.username, 15)}
                                </div>
                                <div className="info">
                                    <div className="detail">
                                        <i className="icons icon-user" />
                                        <div className="detail-text">
                                            Human Resources
                                        </div>
                                    </div>
                                    {hremp.contact && <div className="detail">
                                        <i className="icons icon-phone" />
                                        <div className="detail-text">
                                            {hremp.contact}
                                        </div>
                                    </div>}
                                    <div className="detail">
                                        <i className="icons icon-email" />
                                        <div className="detail-text">
                                            {ellipsis(hremp.email, 22)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }
    };

    const empHierarchy = () => {
        if (alldata) {
            return alldata.map(emp => {
                if (emp.role === 'Employee') {
                    return (
                        <div className="card">
                            <div className="emp-image">
                                <img
                                    className="userimg"
                                    src={emp.imagePath}
                                    alt="no availale"
                                />
                            </div>
                            <div className="card-body">
                                <div className="name">
                                    {ellipsis(emp.username, 15)}
                                </div>
                                <div className="info">
                                    <div className="detail">
                                        <i className="icons icon-user" />
                                        <div className="detail-text">
                                            {emp.role}
                                        </div>
                                    </div>
                                    {emp.contact && <div className="detail">
                                        <i className="icons icon-phone" />
                                        <div className="detail-text">
                                            {emp.contact}
                                        </div>
                                    </div>}
                                    <div className="detail">
                                        <i className="icons icon-email" />
                                        <div className="detail-text">
                                            {ellipsis(emp.email, 22)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }
            });
        }
    };

    const ellipsis = (text, maxlength) => {
        if (text.length > maxlength) {
            return text.substring(0, maxlength - 3) + '...';
        } else {
            return text;
        }
    };

    return (
        <div className="ehs">
            <h3>Employee Hierarchy</h3>

            <div className="admin-hierarchy">
                <h4>Admin</h4>
                <div className="cards">{adminHierarchy()}</div>
            </div>
            <div className="hr-hierarchy">
                <h4>HR</h4>
                <div className="cards">{hrHierarchy()}</div>
            </div>
            <div className="emp-hierarchy">
                <h4>Employee</h4>
                <div className="cards">{empHierarchy()}</div>
            </div>
        </div>
    );
};

export default EmployeeHierarchySystem;
