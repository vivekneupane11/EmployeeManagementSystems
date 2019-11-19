import React, { Component } from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDept, notification } from 'actions';
import EditDeptForm from './EditDeptForm';
import './style.scss';

export class EditDepart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            name: '',
            depthead: '',
            error: ''
        };
    }

    componentDidMount() {
        const propdata = this.props.location.state;
        this.setState({
            _id: propdata._id,
            name: propdata.departmentName,
            stableName: propdata.departmentName,

            depthead: propdata.depthead,
            namevalid: '',
            deptheadvalid: ''
        });
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });

        this.validation(name, value);
    }

    validation(name, value) {
        if (name == 'name') {
            if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
                this.setState({ namevalid: 'valid' });
            } else {
                this.setState({ namevalid: 'invalid' });
            }
        } else if (name == 'depthead') {
            if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
                this.setState({ deptheadvalid: 'valid' });
            } else {
                this.setState({ deptheadvalid: 'invalid' });
            }
        }
    }
    goBack = e => {
        this.props.history.goBack();
    };
    handleClick(e) {
        e.preventDefault();
        const state = this.state;

        var myJSONObject = {
            _id: this.state._id,
            departmentName: this.state.name,
            depthead: this.state.depthead
        };

        if (
            (state.namevalid === '' || state.namevalid === 'valid') &&
            (state.deptheadvalid === '' || state.deptheadvalid === 'valid')
        ) {
            this.props.updateDept(myJSONObject);
            setTimeout(() => {
                if (this.props.response.success) {
                    this.props.notification(
                        `${this.state.stableName} was changed to ${this.state.name} `
                    );
                    this.props.history.push('/admin/listdept', {
                        value: true,
                        message: `${this.state.stableName} was changed to ${this.state.name} `
                    });
                } else this.setState({ error: this.props.response.error });
            }, 1000);
        } else {
            this.setState({ error: 'Enter valid information' });
        }
    }

    render() {
        return (
            <EditDeptForm
                onChange={this.onChange.bind(this)}
                data={this.state}
                handleClick={this.handleClick.bind(this)}
                goBack={this.goBack}
            />
        );
    }
}

EditDepart.propTypes = {
    updateDept: PropTypes.func.isRequired,
    notification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    response: state.createdata.response
});

export default connect(
    mapStateToProps,
    { updateDept, notification }
)(withRouter(EditDepart));
