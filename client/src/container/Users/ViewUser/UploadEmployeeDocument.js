import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documents } from 'actions';

import { withRouter } from 'react-router-dom';

import Button from 'components/Button/index.jsx';
import UploadDocument from 'components/DocumentUploadForm';
const axios = require('axios');
class UploadEmployeeDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toaster: 'warning',
            dismiss: '',
            title: '',
            description: '',
            errors: {
                title: false,
                description: false,
                file: false,
                isFormInValid: false
            },
            file: null,
            filename: ''
        };
    }

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value, dismiss: '' });
        //make changes to ingredients
        let newState = JSON.parse(JSON.stringify(this.state.errors));
        newState.form = undefined;
        newState.password = undefined;
        this.setState({
            errors: newState
        });
    };

    setPrivacy = e => {};
    componentDidMount() {}
    handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('document', this.state.file);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('visibility', true);
        formData.append('docType', 'individual');
        formData.append('userID', this.props.id);
        formData.append('author', 'elonmusk@gmail.com');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if (this.state.title && this.state.description && this.state.file) {
            this.props.documents(formData, config);
            setTimeout(() => {
                //Response from redux
                console.log(this.props.response);
                if (this.props.response.data.success) {
                    const value = true;
                    this.props.history.push({
                        pathname: `/admin/view-document/${value}`,
                        value
                    });
                } else {
                    let errors = {};
                    errors['form'] = this.props.response.data.errors[0].detail;
                    errors['isFormInValid'] = true;
                    this.setState({ errors: errors });
                }
            }, 3000);
        } else {
            let errors = {};
            errors['form'] = 'Please Enter valid information';
            errors['isFormInValid'] = true;
            this.setState({ errors: errors });
        }
    };
    handlefiles = e => {
        const filename = e.target.value;
        this.setState({ file: e.target.files[0], filename: filename });
    };
    render() {
        return (
            <div className="bg">
                <div className="text-center">
                    <div
                        className="ml-4"
                        data-toggle="modal"
                        data-target="#modalLoginForm"
                    >
                        <Button className="button--size-big button--gradient-primary">
                            Upload Documents
                        </Button>
                    </div>
                </div>
                <div
                    className="modal fade"
                    id="modalLoginForm"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="myModalLabel"
                    aria-hidden="true"
                >
                    <div
                        className="modal-dialog"
                        role="document"
                        id="modalwindow"
                    >
                        <div className="modal-content">
                            <div className="modal-body">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <UploadDocument
                                    handleSubmit={this.handleSubmit}
                                    handlefiles={this.handlefiles}
                                    filename={this.state.filename}
                                    handleChange={this.handleChange}
                                    setPrivacy={this.setPrivacy}
                                    errors={this.state.errors}
                                    dismiss={this.state.dismiss}
                                    toaster={this.state.toaster}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

UploadDocument.propTypes = {
    documents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    response: state.getdata.res,
    error: state.getdata.error
});

export default connect(
    mapStateToProps,
    { documents }
)(withRouter(UploadEmployeeDocument));
