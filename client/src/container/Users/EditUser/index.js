import React, { Component } from 'react';
import request from 'request';
import { updateData } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import EditUserForm from './EditUserForm';
import decoder from 'jwt-decode';

import './style.scss';
const axios = require('axios');

export class EditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            username: '',
            email: '',
            password: '',
            age: '',
            dob: '',
            address: '',
            contact: '',
            role: '',
            department: '',
            namevalid: '',
            agevalid: '',
            addressvalid: '',
            contactvalid: '',
            display: 'display-block',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase(),
            dismiss: '',
            error: ''
        };
    }

    componentDidMount() {
        const propdata = this.props.location.state;
        this.setState({
            username: propdata.username,
            age: propdata.age,
            address: propdata.address,
            contact: propdata.contact,
            password: propdata.password,
            email: propdata.email,
            _id: propdata._id,
            role: propdata.role,
            department: propdata.department,
            imagePath: propdata.imagePath
        });
    }

    onChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value,
            error: ''
        });

        this.validation(name, value);
    }

    validation(name, value) {
        if (name === 'name') {
            if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
                this.setState({ namevalid: 'valid' });
            } else {
                this.setState({ namevalid: 'invalid' });
            }
        } else if (name === 'contact') {
            if (/^\d{10}$/.test(value)) {
                this.setState({ contactvalid: 'valid' });
            } else {
                this.setState({ contactvalid: 'invalid' });
            }
        } else if (name === 'age') {
            if (/^\d{2}$/.test(value)) {
                this.setState({ agevalid: 'valid' });
            } else {
                this.setState({ agevalid: 'invalid' });
            }
        } else if (name === 'address') {
            if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
                this.setState({ addressvalid: 'valid' });
            } else {
                this.setState({ addressvalid: 'invalid' });
            }
        }
    }

    handleClick(e) {
        e.preventDefault();
        const state = this.state;
        var myJSONObject = {
            _id: this.state._id,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role,
            department: this.state.department,
            contact: this.state.contact,
            age: this.state.age,
            address: this.state.address,
            dob: this.state.dob
        };

        if (
            (state.namevalid === '' || state.namevalid === 'valid') &&
            (state.agevalid === '' || state.agevalid === 'valid') &&
            (state.contactvalid === '' || state.contactvalid === 'valid')
        ) {
            this.props.updateData(myJSONObject);
            setTimeout(() => {
                if (this.props.response.body.success) {
                    this.setState({ dismiss: 'modal' });
                    this.props.history.push(`/${this.state.loggedin}`);
                    document.location.reload();
                }
            }, 500);
        } else {
            this.setState({ dismiss: '', error: 'Enter valid information' });
        }
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('email', this.props.location.state.email);

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
    }
    _handleImageChange = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result
            });
        };
        reader.readAsDataURL(file);
    };
    render() {
        return (
            <EditUserForm
                onChange={this.onChange.bind(this)}
                data={this.state}
                handleClick={this.handleClick.bind(this)}
                _handleImageChange={this._handleImageChange}
                imagePreviewUrl={this.state.imagePreviewUrl}
                redirect={this.props.location.state}
                dismiss={this.state.dismiss}
                error={this.state.error}
            />
        );
    }
}

EditUser.propTypes = {
    updateData: PropTypes.func
};

const mapStateToProps = state => ({
    response: state.createdata.response
});

export default connect(
    mapStateToProps,
    { updateData }
)(withRouter(EditUser));
