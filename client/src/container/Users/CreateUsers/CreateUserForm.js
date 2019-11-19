import React from 'react';
import InputNormal from 'components/InputNormal';
import Button from 'components/Button';
import Dropdown from 'components/Dropdown';
import Toaster from 'components/Toaster';
const CreateUserForm = props => {
    const {
        handleChange,
        onClick,
        namevalid,
        emailvalid,
        dropdown,
        selectValue,
        loggedin
    } = props;

    return (
        <div className="create-users  col-md-5">
            <h3>Add an Employee</h3>
            <div className="create-user-form col-12 d-flex flex-row">
                <form className="user-form" id="userForm">
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{namevalid}</p>
                        </div>
                        <InputNormal
                            type="text"
                            id="userName"
                            className="input-field"
                            name="username"
                            onChange={handleChange}
                            label="Name"
                        />
                    </div>
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{emailvalid}</p>
                        </div>
                        <InputNormal
                            type="text"
                            id="email"
                            className="input-field"
                            name="email"
                            onChange={handleChange}
                            label="Email"
                        />
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <Dropdown
                            datas={
                                loggedin === 'admin'
                                    ? [
                                          { departmentName: 'HR', _id: 'hr' },
                                          {
                                              departmentName: 'Employee',
                                              _id: 'emp'
                                          }
                                      ]
                                    : [
                                          {
                                              departmentName: 'Employee',
                                              _id: 'emp'
                                          }
                                      ]
                            }
                            title="Role"
                            name="role"
                            onChange={selectValue}
                        />
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <Dropdown
                            datas={dropdown}
                            title="Department"
                            name="department"
                            onChange={selectValue}
                        />
                    </div>

                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around" />
                    <div className="error-message pb-2">
                        {props.error && (
                            <Toaster
                                className={'warning'}
                                errorMessage={props.error}
                            />
                        )}
                    </div>
                    <div className="submit-button">
                        <Button
                            className="button--size-big button--gradient-primary"
                            buttonName="Add Employee"
                            handleClick={onClick}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUserForm;
