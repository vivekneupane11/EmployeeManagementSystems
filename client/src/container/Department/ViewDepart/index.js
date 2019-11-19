import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ViewDeptTable from './ViewDeptTable';

import './style.scss';

export class ViewUser extends Component {
    handleEdit(e) {
        e.preventDefault();
        this.props.history.push('/admin/editdept', this.props.location.state);
    }
    componentDidMount() {}
    render() {
        return (
            <ViewDeptTable
                handleEdit={e => this.handleEdit(e)}
                data={this.props.location.state}
            />
        );
    }
}

export default withRouter(ViewUser);
