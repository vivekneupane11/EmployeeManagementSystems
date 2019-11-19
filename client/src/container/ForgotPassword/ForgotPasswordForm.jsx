import React from 'react';

import { Link } from 'react-router-dom';
import Toaster from 'components/Toaster/index.jsx';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import LoadingPage from 'components/LoadingPage';
import Button from 'components/Button/index.jsx';
import Input from 'components/Input/index.jsx';
import 'assets/styles/forgotpassword.scss';

const ForgotPasswordForm = props => {
    var formDescp = null;
    if (!props.isEmailSentSuccess) {
        formDescp = <p> Enter your Email Address to reset the password</p>;
    } else {
        formDescp = <p>Check your email to successfully reset password</p>;
    }
    return (
        <div className="forget-password-form">
            <div className="form-header">
                <h2 className="form-heading">Reset Password</h2>
                <div className="form-descp">{formDescp}</div>
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
                                SEND
                            </Button>
                        </div>
                    </div>
                </form>
            )}
            {props.flag && <LoadingPage />}
        </div>
    );
};
export default ForgotPasswordForm;
