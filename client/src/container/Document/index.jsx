import React from 'react';
import { withRouter } from 'react-router-dom';
import DocumentUploadForm from 'components/DocumentUploadForm';
const axios = require('axios');
class UploadDocument extends React.Component {
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
        formData.append('author', 'elonmusk@gmail.com');
        formData.append('doc_type', 'organization');

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
                    //     pathname: `/admin/view-document/${value}`
                    // });
                });
            // .catch(error => {
            //     console.log(error);

            //     let errors = {};
            //     errors['form'] = 'File should be in pdf format only';
            //     errors['isFormInValid'] = true;
            //     this.setState({ errors: errors });
            // });
        } else if (!this.state.file) {
            let errors = {};
            errors['form'] = 'Please Select a file';
            errors['isFormInValid'] = true;
            this.setState({ errors: errors });
        } else if (this.state.title.length > 10) {
            let errors = {};
            errors['form'] =
                'Title should be less than 10 characters in length';
            errors['isFormInValid'] = true;
            this.setState({ errors: errors });
        } else {
            let errors = {};
            errors['form'] = 'Fields cannot be Empty';
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
            <DocumentUploadForm
                handleSubmit={this.handleSubmit}
                handlefiles={this.handlefiles}
                filename={this.state.filename}
                handleChange={this.handleChange}
                setPrivacy={this.setPrivacy}
                errors={this.state.errors}
                privacyNeeded={true}
            />
        );
    }
}

export default withRouter(UploadDocument);
