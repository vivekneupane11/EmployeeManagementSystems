import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ViewDeptTable from './ViewDeptTable';

import './style.scss';

export class ViewUser extends Component {
    constructor(props) {
        super(props);
    }

    handleEdit(e) {
        e.preventDefault();
        this.props.history.push('/admin/editdept', this.props.location.state);
    }

    render() {
        return (
            <ViewDeptTable
                // data={this.props.data}
                handleEdit={e => this.handleEdit(e)}
                data={this.props.location.state}
            />
        );
    }
}

export default withRouter(ViewUser);
