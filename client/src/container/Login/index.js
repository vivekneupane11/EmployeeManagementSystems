import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import decoder from 'jwt-decode';
import PropTypes from 'prop-types';
import { loginRequest } from 'actions';
import Auth from 'utils/auth';
import ValidateField from 'utils/helpers/ValidateField';
import LoginForm from './LoginForm.jsx';
import 'assets/styles/form.scss';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { email: '', password: '' },
            errors: { isValidForm: false },
            isVisible: false,
            loading: false
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
        newState.form = undefined;

        this.setState(() => ({
            errors: newState
        }));
    };
    componentDidMount() {
        if (this.props.location.state) {
            const role = localStorage.getItem('token_id');

            if (this.props.location.state.from && role) {
                document.location.reload();
            }
        }
        const Auto = new Auth();
        const val = Auto.loggedIn();
        if (val) {
            const role = decoder(localStorage.getItem('token_id')).role;
            this.props.history.push(`/${role}`);
        }
    }
    handleSubmit = e => {
        e.preventDefault();
        const error = ValidateField(this.state.fields);
        this.setState({ errors: error });
        if (error['isValidForm']) {
            this.props.loginRequest(this.state.fields);
        }
    };
    componentDidUpdate(prevProps) {
        if (prevProps.getdata !== this.props.getdata) {
            this.setState({ loading: this.props.getdata.loading });
            if (this.props.getdata.res.success) {
                console.log(this.props.getdata.res);
                if (this.props.getdata.res.success) {
                    const val = JSON.parse(this.props.getdata.res.content);
                    localStorage.setItem('token_id', val.token);
                    const role = decoder(
                        localStorage.getItem('token_id')
                    ).role.toLowerCase();
                    this.props.history.push(`/${role}`);
                }
            } else if (this.props.getdata.res.success === false) {
                console.log('error', this.props.getdata.res);
                let errors = {};
                errors['form'] = `${this.props.getdata.res.error}`;
                errors['isValidForm'] = false;
                this.setState({ errors });
            }
        }
    }
    render() {
        let notify;
        if (this.props.location.state) {
            notify = this.props.location.state.value;
        }
        const { fields, errors, isVisible, loading } = this.state;
        return (
            <div>
                <LoginForm
                    fields={fields}
                    errors={errors}
                    handleSubmit={this.handleSubmit}
                    handleUserInput={this.handleUserInput}
                    toggleIcon={this.toggleIcon}
                    isVisible={isVisible}
                    notify={notify}
                    loading={loading}
                />
            </div>
        );
    }
}

Login.propTypes = {
    loginRequest: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToprops = dispatch => ({
    loginRequest: object => dispatch(loginRequest(object))
});

export default connect(
    mapStateToProps,
    mapDispatchToprops
)(withRouter(Login));
