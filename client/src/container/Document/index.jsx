import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { documents } from 'actions';
import { withRouter } from 'react-router-dom';
import DocumentUploadForm from 'components/DocumentUploadForm';
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
            filename: '',
            visibility: 'false'
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
        e.target.value === 'yes'
            ? this.setState({ visibility: 'false' })
            : this.setState({ visibility: 'true' });
    };

    handleSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('document', this.state.file);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('visibility', this.state.visibility);
        formData.append('author', 'elonmusk@gmail.com');
        formData.append('docType', 'organization');
        formData.append('email', 'elonmusk@gmail.com');
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        if (this.state.title && this.state.description && this.state.file) {
            //Upload Document using redux
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
)(withRouter(UploadDocument));
