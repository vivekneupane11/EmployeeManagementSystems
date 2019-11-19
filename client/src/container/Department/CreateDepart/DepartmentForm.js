import React from 'react';
import InputNormal from 'components/InputNormal';
import Button from 'components/Button';
import Toaster from 'components/Toaster';

const DepartmentForm = props => {
    const { name, handleChange, handleClick, namevalid, error } = props;
    return (
        <div className="createDepart">
            <h3 className="m-2">Create Department</h3>
            <form className="d-flex flex-column justify-content-start align-items-start">
                <div className="createDepartForm form-group">
                    <p className="namevalid">{namevalid}</p>
                    <InputNormal
                        type="text"
                        className={'department'}
                        name="department"
                        onChange={handleChange}
                        label="Department"
                    />
                    <div className="error-message">
                        {error && (
                            <Toaster className="warning" errorMessage={error} />
                        )}
                    </div>
                    <Button
                        className="button--size-big button--gradient-primary"
                        buttonName="Add Department"
                        handleClick={handleClick}
                    />
                </div>
            </form>
        </div>
    );
};

export default DepartmentForm;
