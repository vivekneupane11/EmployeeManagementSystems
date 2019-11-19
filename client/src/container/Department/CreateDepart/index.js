import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDept, notification } from 'actions';
import './style.scss';
import DepartmentForm from './DepartmentForm';

class CreateDepart extends Component {
    state = {
        error: '',
        name: '',
        namevalid: ''
    };

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            name: value,
            error: ''
        });

        if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
            this.setState({ namevalid: 'valid' });
        } else {
            this.setState({ namevalid: 'invalid' });
        }
    };

    handleClick(e) {
        e.preventDefault();
        if (this.state.name !== '' && this.state.namevalid === 'valid') {
            var myJSONObject = {
                search: this.state.name,
                departmentName: this.state.name
            };
            this.props.createDept(myJSONObject);
            setTimeout(() => {
                if (this.props.response.success) {
                    this.props.notification(
                        `New department '${this.state.name}' has been created`
                    );
                    this.props.history.push('/admin/listdept');
                } else this.setState({ error: this.props.response.error });
            }, 1000);
        } else if (this.state.namevalid === 'invalid') {
            this.setState({ error: 'Invalid Department-name' });
        } else if (this.state.name === '') {
            this.setState({ error: 'Empty Field' });
        }
    }

    render() {
        const { name, namevalid, error } = this.state;
        return (
            <div>
                <DepartmentForm
                    error={error}
                    name={name}
                    namevalid={namevalid}
                    handleChange={this.handleChange}
                    handleClick={e => {
                        this.handleClick(e);
                    }}
                />
            </div>
        );
    }
}

CreateDepart.propTypes = {
    createDept: PropTypes.func.isRequired,
    notification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    response: state.createdata.response
});
export default connect(
    mapStateToProps,
    { createDept, notification }
)(withRouter(CreateDepart));
