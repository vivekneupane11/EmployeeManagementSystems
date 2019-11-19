import React from 'react';

import { connect } from 'react-redux';
import { getdata, getdeptdata } from 'actions';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';

export class AdminHomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            deptdatas: [],
            admins: [],
            hrs: [],
            emps: []
        };
    }

    componentDidMount() {
        this.props.getdata();

        setTimeout(() => {
            this.props.getdeptdata();
            this.setState({
                datas: this.props.datas
            });
        }, 400);

        setTimeout(() => {
            this.setState({
                deptdatas: this.props.deptdatas
            });
            this.countUsers();
        }, 1000);
    }

    countUsers = () => {
        let admin = [];
        let emp = [];
        let hr = [];
        this.state.datas.map(data => {
            if (data.role === 'admin') {
                Array.prototype.push.apply(admin, [data]);
            } else if (data.role === 'Employee') {
                Array.prototype.push.apply(emp, [data]);
            } else if (data.role === 'HR') {
                Array.prototype.push.apply(hr, [data]);
            }
        });

        this.setState({
            admins: admin,
            emps: emp,
            hrs: hr
        });
    };

    render() {
        return (
            <Dashboard
                datas={this.state.datas}
                deptdatas={this.state.deptdatas}
                admin={this.state.admins}
                hr={this.state.hrs}
                emp={this.state.emps}
            />
        );
    }
}

AdminHomePage.propTypes = {
    getdata: PropTypes.func.isRequired,
    getdeptdata: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired,
    deptdatas: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    datas: state.getdata.datas,
    deptdatas: state.getdata.deptdatas
});

export default connect(
    mapStateToProps,
    { getdata, getdeptdata }
)(AdminHomePage);
