import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';
import img from 'assets/img/User Image - Edit.png';
const EditUserForm = props => {
    const imagePreview = <img src={props.imagePreviewUrl} alt="profile" />;

    return (
        <div>
            <div className="" data-toggle="modal" data-target="#modalEditUser">
                <Button className="button--size-normal button--gradient-primary">
                    Edit
                </Button>
            </div>

            <div
                className="modal fade"
                id="modalEditUser"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h3> Edit User </h3>
                            <div className="edit-user">
                                <div className="edit-form">
                                    <form
                                        className="user-form"
                                        id="userForm"
                                        encType="multipart/formdata"
                                    >
                                        <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                                            <div className="validity">
                                                <p>{props.data.namevalid}</p>
                                            </div>
                                            <Input
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
                                                <p>{props.data.agevalid}</p>
                                            </div>
                                            <Input
                                                type="text"
                                                id="age"
                                                className="input-field"
                                                name="age"
                                                onChange={e => {
                                                    props.onChange(e);
                                                }}
                                                label="Age"
                                                value={props.data.age}
                                            />
                                        </div>

                                        <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                                            <div className="validity">
                                                <p>{props.data.dobvalid}</p>
                                            </div>
                                            <Input
                                                type="date"
                                                id="dob"
                                                className="input-field"
                                                name="dob"
                                                onChange={e => {
                                                    props.onChange(e);
                                                }}
                                                label="DOB"
                                                value={props.data.dob}
                                            />
                                        </div>

                                        <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                                            <div className="validity">
                                                <p>{props.data.contactvalid}</p>
                                            </div>
                                            <Input
                                                type="text"
                                                id="contact"
                                                className="input-field"
                                                name="contact"
                                                onChange={e => {
                                                    props.onChange(e);
                                                }}
                                                label="Contact"
                                                value={props.data.contact}
                                            />
                                        </div>

                                        <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                                            <div className="validity">
                                                <p>{props.data.addressvalid}</p>
                                            </div>
                                            <Input
                                                type="text"
                                                id="address"
                                                className="input-field"
                                                name="address"
                                                onChange={e => {
                                                    props.onChange(e);
                                                }}
                                                label="Address"
                                                value={props.data.address}
                                            />
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
                                        <input
                                            name="myImage"
                                            id="file-id"
                                            className="fileInput"
                                            type="file"
                                            onChange={props._handleImageChange}
                                        />
                                    </form>
                                </div>

                                <div className="user-profile">
                                    <div className="overlay" />
                                    <div className="icons">
                                        <label htmlFor="file-id">
                                            <i className="icon-edit" />
                                        </label>
                                    </div>

                                    {imagePreview}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditUserForm;
