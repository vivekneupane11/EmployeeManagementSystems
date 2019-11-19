import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import decoder from 'jwt-decode';
import ViewUserTable from './ViewUserTable';
import './style.scss';

export class ViewUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }
    render() {
        return (
            <ViewUserTable
                data={this.props.location.state}
                loggedin={this.state.loggedin}
            />
        );
    }
}

export default withRouter(ViewUser);
