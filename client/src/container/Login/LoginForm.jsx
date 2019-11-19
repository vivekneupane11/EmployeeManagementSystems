import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'components/Button/index.jsx';
import Input from 'components/Input/index.jsx';
import Error from 'components/Toaster/index.jsx';
import Notification from 'components/Notification';
import Loading from 'components/LoadingPage/index';
import 'assets/styles/form.scss';

const LoginForm = props => {
    return (
        <div>
            <div className="formbox">
                <form
                    className="demo-form"
                    noValidate
                    onSubmit={props.handleSubmit}
                >
                    <div className="form-header">
                        <h2 className="form-heading">SIGN IN PAGE</h2>
                        <div className="form-descp">
                            <p className="">
                                Enter you email and password to continue
                            </p>
                            <p className="">
                                To reset password click on forgot password field
                            </p>
                        </div>
                    </div>
                    <div className="input-fields">
                        <Input
                            label={'Email'}
                            name={'email'}
                            type={'text'}
                            value={props.fields['email']}
                            onChange={props.handleUserInput}
                            className={'normal'}
                        />
                        <Input
                            label={'Password'}
                            name={'password'}
                            type={props.isVisible ? 'text' : 'password'}
                            value={props.fields['password']}
                            onChange={props.handleUserInput}
                        >
                            <i
                                className={
                                    props.isVisible
                                        ? 'icon-eye'
                                        : 'icon-eye-slash'
                                }
                                onClick={props.toggleIcon}
                            />
                        </Input>
                        <div className="remember_error_container">
                            <div className="remember_forgot_panel">
                                <div>
                                    <span />
                                </div>
                                <div className="forgot-password">
                                    <Link to="/forgot-password">
                                        Forgot Password?
                                    </Link>
                                </div>
                            </div>
                            <div className="error">
                                {props.errors.form && (
                                    <Error
                                        errorMessage={`${props.errors.form}`}
                                        className={'warning'}
                                    />
                                )}
                            </div>
                            <div className="">
                                {props.loading && <Loading />}
                            </div>
                        </div>
                    </div>
                    <div className="fade-in">
                        {!props.loading && (
                            <div className="buttonwrapper">
                                <Button
                                    buttonName={'LOGIN'}
                                    className={
                                        'button--size-big button--gradient-primary'
                                    }
                                />
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
