import React, { Component } from 'react';
import { getdata } from 'actions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import decoder from 'jwt-decode';
import EmployeeHierarchySystem from './EmployeeHierarchySystem';
import './style.scss';

export class EmployeeHierarchy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alldata: this.props.datas,
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    componentDidMount() {
        this.props.getdata();
    }

    render() {
        return (
            <EmployeeHierarchySystem
                toListUser={e => {
                    this.toListUser(e);
                }}
                alldata={this.props.datas}
            />
        );
    }
}

EmployeeHierarchy.propTypes = {
    getdata: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    datas: state.getdata.datas
});

export default connect(
    mapStateToProps,
    { getdata }
)(withRouter(EmployeeHierarchy));
