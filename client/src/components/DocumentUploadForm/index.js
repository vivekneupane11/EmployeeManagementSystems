import React from 'react';
import 'container/Document/index.scss';
import Button from 'components/Button';
import Error from 'components/Toaster/index.jsx';
const UploadDocument = props => {
    return (
        <div className="container">
            <div className="header">
                <div className="heading">
                    <h2>Upload Document</h2>
                </div>
                <div className="">
                    <p>
                        Click on select file to upload document. Enter title,
                        description and whether you want to make document public
                        or not before uploading .Please make sure you are
                        uploading on .pdf formats as other format are not
                        supported.
                    </p>
                </div>
            </div>
            <div className="upload-form-body">
                <form className="demo-form" onSubmit={props.handleSubmit}>
                    <div className="inputfields">
                        <input
                            type="file"
                            id="file"
                            name="myFile"
                            className="inputfile"
                            onChange={props.handlefiles}
                        />
                    </div>
                    <div className="inputfields ">
                        <p>Select Document</p>
                        <div className="filename">
                            <input
                                type="text"
                                value={props.filename}
                                readOnly
                            />
                            <label htmlFor="file">
                                <i className="icon-document" />
                                Select a file
                            </label>
                        </div>
                    </div>
                    <div className="inputfields title">
                        <p>Title:</p>
                        <input
                            type="text"
                            name="title"
                            value={props.title}
                            onChange={props.handleChange}
                        />
                    </div>
                    <div className="inputfields description">
                        <p> Description:</p>
                        <textarea
                            name="description"
                            value={props.description}
                            onChange={props.handleChange}
                        />
                    </div>

                    {props.privacyNeeded && (
                        <div
                            className="inputfields radio "
                            onChange={props.setPrivacy}
                        >
                            <p>Make Private:</p>
                            <input
                                type="radio"
                                name="Privacy"
                                value="yes"
                                defaultChecked
                            />
                            Yes
                            <input type="radio" name="Privacy" value="no" />
                            No
                        </div>
                    )}
                    {props.errors['form'] && (
                        <Error
                            className={'warning'}
                            errorMessage={props.errors['form']}
                        />
                    )}
                    <div className="inputfields">
                        <Button
                            className={
                                'button--size-big button--gradient-primary'
                            }
                        >
                            <i className="icon-document" />
                            Upload
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UploadDocument;
