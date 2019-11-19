import React from 'react';
import Button from 'components/Button/index.jsx';
import Input from 'components/Input/index.jsx';
import { Link } from 'react-router-dom';
import 'assets/styles/forgotpassword.scss';
import Toaster from 'components/Toaster/index.jsx';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const ForgotPasswordForm = props => {
    var formDescp = null;
    if (!props.isEmailSentSuccess) {
        formDescp = <p> Enter your Email Address to reset the password</p>;
    } else {
        formDescp = <p>Check your Email</p>;
    }

    return (
        <div className="forget-password-form">
            <div className="form-header">
                <h2 className="form-heading">Reset Password</h2>
                <p className="form-descp">{formDescp}</p>
                <Link to="/">
                    <span className="links">
                        <FaAngleDoubleLeft />
                        Back
                    </span>
                </Link>
            </div>
            {!props.isEmailSentSuccess && (
                <form
                    className="forgotpassword-form"
                    noValidate
                    onSubmit={props.handleSubmit}
                >
                    <Input
                        id={'email_id'}
                        label={'Email'}
                        name={'email'}
                        type={'text'}
                        icon={false}
                        value={props.email}
                        validity={'props.validEmail'}
                        onChange={props.handleChange}
                    />
                    <div className="forgotpassword-footer">
                        <div className="error-message">
                            {props.errors.email && (
                                <Toaster
                                    errorMessage={props.errors.email}
                                    className={'warning'}
                                />
                            )}
                        </div>
                        <div className="buttonwrapper-next">
                            <Button
                                className={
                                    'button--size-big button--gradient-primary'
                                }
                            >
                                RESET
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};
export default ForgotPasswordForm;
