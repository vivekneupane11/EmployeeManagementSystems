import React from 'react';
import Button from 'components/Button/index.jsx';
import UploadDocument from 'components/DocumentUploadForm';
const axios = require('axios');
class UploadEmployeeDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
        this.setState({ [name]: value });
        //make changes to ingredients
        let newState = JSON.parse(JSON.stringify(this.state.errors));
        newState.form = undefined;
        newState.password = undefined;
        this.setState({
            errors: newState
        });
    };

    setPrivacy = e => {
        console.log(e.target.value);
    };

    handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('myFile', this.state.file);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('visibility', true);
        formData.append('doc_type', 'individual');
        formData.append('email', this.props.email);
        formData.append('author', 'elonmusk@gmail.com');

        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };

        if (this.state.title && this.state.description && this.state.file) {
            axios
                .post('http://localhost:4000/document-upload', formData, config)
                .then(response => {
                    console.log(response);

                    // const value = true;
                    // this.props.history.push({
                    //     pathname: `/hr/view-document/${value}`
                    // });
                });
            // .catch(error => {
            //     let errors = {};
            //     errors['form'] = 'Please enter file in pdf format only';
            //     errors['isFormInValid'] = true;
            //     this.setState({ errors: errors });
            // });
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
                        <Button className="button--size-normal button--gradient-primary">
                            Upload
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
                                <UploadDocument
                                    handleSubmit={this.handleSubmit}
                                    handlefiles={this.handlefiles}
                                    filename={this.state.filename}
                                    handleChange={this.handleChange}
                                    setPrivacy={this.setPrivacy}
                                    errors={this.state.errors}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default UploadEmployeeDocument;
