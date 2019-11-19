import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyToken, updatePassword } from 'actions';
import ValidateField from './ValidateField';
import ResetPasswordForm from './ResetPasswordForm.jsx';
import 'assets/styles/resetpassword.scss';

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

        const token = this.state.token;
        const email = this.state.email;

        console.log(token);
        console.log(email);
        console.log('email', this.state.email);
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
                email: this.state.email,
                token: this.state.token
            };
            this.props.updatePassword(obj);
            setTimeout(() => {
                let errors = {};

                if (this.props.res) {
                    if (this.props.res.data) {
                        this.props.history.push('/', { value: true });
                    } else if (this.props.error) {
                        errors['email'] = `${'Email not registered'}`;
                        this.setState({ errors });
                    } else {
                        errors['password'] =
                            'Error in Token! Send another link';
                        errors['isValidPassword'] = false;
                        this.setState({ errors: errors });
                    }
                }
            }, 2000);
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

ResetPassword.propTypes = {
    updatePassword: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    response: state.getdata.res,
    res: state.createdata.res
});

export default connect(
    mapStateToProps,
    { verifyToken, updatePassword }
)(ResetPassword);
