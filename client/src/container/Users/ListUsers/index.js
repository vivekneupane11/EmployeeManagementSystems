import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserTable from './UserTable';
import { connect } from 'react-redux';
import { getdata, searchUser } from 'actions';
import './style.scss';

class ListUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }
    componentDidMount() {
        this.props.getdata();
    }

    keyupsearch = e => {
        this.setState({
            search: e.target.value
        });

        this.props.searchUser({ searchname: e.target.value });
    };

    render() {
        return (
            <UserTable
                datas={this.props.data}
                keyupsearch={this.keyupsearch}
                responseData={this.props.response}
            />
        );
    }
}
ListUsers.propTypes = {
    getdata: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    searchUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    data: state.getdata.datas,
    response: state.getdata.res,
    notification: state.getdata.notification
});

export default connect(
    mapStateToProps,
    { getdata, searchUser }
)(ListUsers);
