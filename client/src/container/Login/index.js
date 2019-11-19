import React from 'react';
import 'assets/styles/form.scss';
import { withRouter } from 'react-router-dom';
import ValidateField from 'utils/helpers/ValidateField';
import request from 'request';
import 'components/RadioButton/index.jsx';
import LoginForm from './LoginForm.jsx';
import decoder from 'jwt-decode';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from 'actions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { email: '', password: '' },
            errors: { isValidForm: false },
            redirect: false,
            isVisible: false
        };
    }
    toggleIcon = e => {
        this.setState({ isVisible: this.state.isVisible ? false : true });
    };
    handleUserInput = e => {
        const name = e.target.name;
        const value = e.target.value;
        let fields = this.state.fields;
        fields[name] = value;
        this.setState({ fields });
        this.setState({ [name]: value });
        let newState = JSON.parse(JSON.stringify(this.state.errors));
        //make changes to ingredients
        newState.email = undefined;
        newState.password = undefined;
        this.setState({
            errors: newState
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        console.log('hello');

        const error = ValidateField(this.state.fields);
        this.setState({ errors: error });
        console.log(error);
        console.log(error['isvalidForm']);

        if (error['isValidForm']) {
            
            this.props.login(this.state.fields);
            
            setTimeout(() => {
                let errors = {};            
                const response = this.props.response;
                console.log(response)
                if (response.statusCode === 401) {
                    console.log(response);
                    errors['form'] = `${response.body.message.error}`;
                    errors['isValidForm'] = false;
                    this.setState({ errors });
                } else if (response.body.message.success) {
                    localStorage.setItem(
                        'token_id',
                        response.body.message.token
                    );
                    const role = decoder(
                        localStorage.getItem('token_id')
                    ).role.toLowerCase();
                    
                    this.props.history.push(`/${role}`);
                }
            }, 1000);              
        }
    };

    render() {
        const { fields, errors, isVisible } = this.state;
        return (
            <LoginForm
                fields={fields}
                errors={errors}
                handleSubmit={this.handleSubmit}
                handleUserInput={this.handleUserInput}
                toggleIcon={this.toggleIcon}
                isVisible={isVisible}
            />
        );
    }
}

Login.propTypes={
    login: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    response: state.getdata.res
})

export default connect(mapStateToProps, {login})(withRouter(Login));
