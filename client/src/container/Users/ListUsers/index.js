import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserTable from './UserTable';
import { connect } from 'react-redux';
import { getdata } from 'actions';
import './style.scss';

class ListUsers extends Component {
    // constructor(props) {
    //     super(props);

    // }
    componentDidMount() {
        this.props.getdata();
        
    }

    render() {
        return <UserTable datas={this.props.data} />;
    }
}
ListUsers.propTypes = {
    getdata: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    data: state.getdata.datas
});

export default connect(
    mapStateToProps,
    { getdata }
)(ListUsers);
