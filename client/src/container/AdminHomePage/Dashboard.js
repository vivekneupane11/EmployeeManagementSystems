import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './dashboard.scss';
export default function Dashboard(props) {
    const { datas, deptdatas, admin, hr, emp } = props;
    const data = [
        { name: 'Admin', value: admin.length },
        { name: 'HR', value: hr.length },
        { name: 'Employee', value: emp.length }
    ];
    const colors = ['#222D51', '#269A90', '#BC3333'];

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip bg-white px-2">
                    <p className="label text-warning">{`${payload[0].name} : ${
                        payload[0].value
                    }`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="dashboard">
            <h3>Admin Dashboard</h3>
            <div className="mt-4">
                <h4 className="text-dark mb-2">Employee</h4>
                <div className="d-flex flex-wrap my-2">
                    <div className="card">
                        <div className="card-title d-flex">
                            <i className="card-icon icon-user" />
                            <div>Total users</div>
                        </div>
                        <div className="card-body">{datas.length}</div>
                    </div>

                    <div className="card">
                        <div className="card-title d-flex">
                            <i className="card-icon icon-user" />
                            <div>Admins</div>
                        </div>
                        <div className="card-body">{admin.length}</div>
                    </div>

                    <div className="card">
                        <div className="card-title d-flex">
                            <i className="card-icon icon-user" />
                            <div>HRs</div>
                        </div>
                        <div className="card-body">{hr.length}</div>
                    </div>

                    <div className="card">
                        <div className="card-title d-flex">
                            <i className="card-icon icon-user" />
                            <div>Employees</div>
                        </div>
                        <div className="card-body">{emp.length}</div>
                    </div>
                </div>
            </div>
            <div className="mt-3">
                <h4 className="text-dark mb-2 mt-4">Department</h4>
                <div className="card">
                    <div className="card-title d-flex">
                        <i className="card-icon icon-user" />
                        <div>Total Department</div>
                    </div>
                    <div className="card-body">{deptdatas.length}</div>
                </div>
            </div>

            <div className="mt-2">
                <h4 className="text-dark mt-4">Employee Pie Chart</h4>
                <div className="d-flex flex-row flex-wrap justify-content-around align-items-center">
                    <PieChart width={350} height={400}>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>

                    <div className="legend">
                        <div className="d-flex">
                            <i className="icon-go admin" />
                            <div>Admin</div>
                        </div>
                        <div className="d-flex pt-4">
                            <i className="icon-go hr" />
                            <div>HR</div>
                        </div>
                        <div className="d-flex pt-4">
                            <i className="icon-go emp" />
                            <div>Employee</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
