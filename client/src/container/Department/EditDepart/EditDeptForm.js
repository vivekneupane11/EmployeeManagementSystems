import React from 'react';
import { Link } from 'react-router-dom';
import NormalInput from 'components/InputNormal';
import Button from 'components/Button';
import Toaster from 'components/Toaster';

const EditDeptForm = props => {
    return (
        <div className="edit-dept">
            <h3> Edit dept </h3>
            <Button>
                <icon onClick={props.goBack} className="icon-bell" />
            </Button>
            <form className="dept-form" id="deptForm">
                <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                    <div className="validity">
                        <p>{props.data.namevalid}</p>
                    </div>
                    <NormalInput
                        type="text"
                        id="name"
                        className="input-field"
                        name="name"
                        onChange={e => {
                            props.onChange(e);
                        }}
                        label="Name"
                        value={props.data.name}
                    />
                </div>
                <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                    <div className="validity">
                        <p>{props.data.deptheadvalid}</p>
                    </div>
                </div>
                <div className="error-message">
                    {props.data.error && (
                        <Toaster
                            className={'warning'}
                            errorMessage={props.data.error}
                        />
                    )}
                </div>
                <div className="submit-button">
                    <Button
                        className="button--size-normal button--gradient-primary"
                        buttonName="Edit"
                        handleClick={e => {
                            props.handleClick(e);
                        }}
                    />
                </div>
            </form>
        </div>
    );
};

export default EditDeptForm;
