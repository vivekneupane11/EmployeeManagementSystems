import React from 'react';
import 'assets/styles/resetpassword.scss';
import ValidateField from './ValidateField';
import request from 'request';
import ResetPasswordForm from './ResetPasswordForm.jsx';
import { timeout } from 'q';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyToken, updatePassword } from 'actions';


class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                password: '',
                confirmPassword: ''
            },
            errors: {
                isValidPassword: false
            },
            isResetSuccessful: false,
            isTokenVerified: false,
            isTokenExpired: false,
            token: props.match.params.token,
            email: props.match.params.email
        };
    }
    async componentDidMount() {
        //to check if token exists and still valid
        let tokenObj = {
            token: this.state.token,
            email: this.state.email
        };

        console.log("email",this.state.email)

        this.props.verifyToken(tokenObj);
        setTimeout(() => {
            const response = this.props.response;
            if (response.body.message.success) {
                this.setState({ isTokenVerified: true });
            } else {
                this.setState({ isTokenExpired: true });
            }

        }, 500);
        
        
    }
    handleUserInput = e => {
        //inputs from password and reset password
        let name = e.target.name;
        let value = e.target.value;
        let fields = this.state.fields;
        fields[name] = value;
        //clear error message
        let newState = JSON.parse(JSON.stringify(this.state.errors));
        newState.email = undefined;
        this.setState({
            errors: newState
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        //Validate fields before submitting
        const error = ValidateField(this.state.fields);
        this.setState({ errors: error });
        if (error['isValidPassword']) {
            this.setState({ isResetSuccessful: true });
            const obj = {
                password: this.state.fields['password'],
                email: this.state.email
            };
            this.props.updatePassword(obj);
            setTimeout(() => {
                const response= this.props.res;
                let errors = {};
                    if (response.body.detail.success) {
                        this.setState({ isTokenVerified: false });
                        window.setTimeout(this.props.history.push('/'), 5000);
                    } else {
                        errors['email'] = `${response.body.message.error}`;
                        this.setState({ errors });
                    }
            }, 500);
            
        }
    };
    render() {
        const {
            fields,
            errors,
            isResetSuccessful,
            isTokenVerified,
            isTokenExpired,
            email,
            token
        } = this.state;
        return (
            <ResetPasswordForm
                handleSubmit={this.handleSubmit}
                handleUserInput={this.handleUserInput}
                fields={fields}
                errors={errors}
                isResetSuccessful={isResetSuccessful}
                isTokenVerified={isTokenVerified}
                isTokenExpired={isTokenExpired}
                email={email}
                token={token}
            />
        );
    }
}

ResetPassword.propTypes={
    login: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    response: state.getdata.res,
    res: state.createdata.res
})

export default connect(mapStateToProps, {verifyToken, updatePassword})(ResetPassword);
