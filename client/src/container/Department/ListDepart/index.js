import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getdeptdata, searchDept, notification } from 'actions';
import { withRouter } from 'react-router-dom';
import DeptTable from './DeptTable';

import './style.scss';

class ListDepart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            name: '',
            dept: [],
            search: '',
            deptdata: [],
            notification: ''
        };
    }

    componentDidMount() {
        this.props.getdeptdata();
    }
    // componentDidUpdate() {
    //     this.props.getdeptdata();
    // }
    componentWillReceiveProps() {
        this.setState({
            deptdata: this.props.deptdatas
        });
    }

    keyupsearch = e => {
        this.setState({
            search: e.target.value
        });

        this.props.searchDept({ search: e.target.value });
    };

    render() {
        return (
            <DeptTable
                deptdatas={this.props.deptdatas}
                keyupsearch={this.keyupsearch}
                search={this.search}
                responseData={this.props.response}
            />
        );
    }
}

ListDepart.propTypes = {
    getdeptdata: PropTypes.func.isRequired,
    searchdept: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    deptdatas: state.getdata.deptdatas,
    response: state.getdata.res,
    error: state.getdata.error,
    notification: state.getdata.notification
});
export default connect(
    mapStateToProps,
    { getdeptdata, searchDept }
)(withRouter(ListDepart));
