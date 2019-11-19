import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMail } from 'actions';
import ValidateField from 'utils/helpers/ValidateField';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';
import 'assets/styles/forgotpassword.scss';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            isEmailSentSuccess: false,
            fields: {
                email: ''
            },
            errors: {
                isValidEmail: false
            }
        };
    }
    handleChange = e => {
        let name = e.target.name;
        let value = e.target.value;
        let fields = this.state.fields;
        fields[name] = value;
        let newState = JSON.parse(JSON.stringify(this.state.errors));
        newState.email = undefined;
        this.setState({
            errors: newState
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        const error = ValidateField(this.state.fields);
        this.setState({ errors: error });

        if (error['isValidEmail']) {
            const obj = {
                email: this.state.fields['email']
            };
            this.setState({ flag: true });
            this.props.sendMail(obj);
            setTimeout(() => {
                this.isEmailSentSuccess();
            }, 9000);
        }
    };

    isEmailSentSuccess = () => {
        this.setState({ flag: false });
        let errors = {};
        if (this.props.response) {
            if (this.props.response.data) {
                this.setState({ isEmailSentSuccess: true });
            } else if (this.props.error) {
                errors['email'] = `${'Email not registered'}`;
                this.setState({ errors });
            } else {
                errors['email'] = `Please Check your internet connection`;
                this.setState({ errors });
            }
        }
    };

    render() {
        return (
            <ForgotPasswordForm
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                fields={this.state.fields}
                errors={this.state.errors}
                isEmailSentSuccess={this.state.isEmailSentSuccess}
                flag={this.state.flag}
            />
        );
    }
}

ForgotPassword.propTypes = {
    sendMail: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    response: state.createdata.res,
    data: state.createdata.data,
    error: state.createdata.error
});

export default connect(
    mapStateToProps,
    { sendMail }
)(ForgotPassword);
