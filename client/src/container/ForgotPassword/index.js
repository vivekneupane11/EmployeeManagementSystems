import React from 'react';
import 'assets/styles/forgotpassword.scss';
import Toaster from 'components/Toaster/index.jsx';
import ValidateField from 'utils/helpers/ValidateField';
import ForgotPasswordForm from './ForgotPasswordForm.jsx';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { sendMail } from 'actions';

class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: true,
            fields: {
                email: ''
            },
            errors: {
                isValidEmail: false
            },
            isEmailSentSuccess: false
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
        console.log(error);
        this.setState({ errors: error });
        if (error['isValidEmail']) {
            const obj = {
                email: this.state.fields['email']
            };

            this.props.sendMail(obj);
            
            setTimeout(() => {
                this.isEmailSentSuccess(); 
            }, 9000);
        }
    };

    isEmailSentSuccess = () =>{
        let errors = {};    
        console.log("lol",this.props.response)
        if (this.props.response.body.message.success) {
            this.setState({ isEmailSentSuccess: true });
        } else {
            errors['email'] = `${this.props.response.body.message.error}`;
            this.setState({ errors });
        }
        
        
    }


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

ForgotPassword.propTypes={
    sendMail: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    response: state.createdata.response,
    data: state.createdata.data
})


export default connect(mapStateToProps, {sendMail})(ForgotPassword);
