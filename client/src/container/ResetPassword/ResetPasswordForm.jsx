import React from 'react';
import 'assets/styles/resetpassword.scss';
import Button from 'components/Button/index';
import Input from 'components/Input/index';
import Error from 'components/Toaster/index.jsx';
import { FaAngleDoubleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const ResetPasswordForm = props => {
    return (
        <div>
            {props.isTokenExpired && (
                <div className="token-error-message">
                    <h3>Sorry your reset time has Expired!</h3>
                    <Link to="/forgot-password">Send Another Email?</Link>
                </div>
            )}
            {props.isTokenVerified && (
                <form
                    className="demo-form"
                    noValidate
                    onSubmit={props.handleSubmit}
                >
                    <div className="form-header">
                        <h2 className="form-heading">Reset Password</h2>
                        <div className="form-descp">
                            <p className="">
                                Enter in password and confirm password field to
                                set new password. Password must be atleast 6
                                character long.
                            </p>
                        </div>
                    </div>
                    <div className="input-fields">
                        <Input
                            label={'Password'}
                            name={'password'}
                            type={'password'}
                            value={props.password}
                            onChange={props.handleUserInput}
                        />
                        <Input
                            label={'Confirm Password'}
                            name={'confirmPassword'}
                            type={'password'}
                            value={props.password}
                            onChange={props.handleUserInput}
                        />
                    </div>
                    <div className="fade-in">
                        <div className="error">
                            {props.errors.password && (
                                <Error
                                    errorMessage={props.errors.password}
                                    className={'warning'}
                                />
                            )}
                        </div>
                        <div className="buttonwrapper">
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

export default ResetPasswordForm;
