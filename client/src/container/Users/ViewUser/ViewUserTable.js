import React from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteData } from 'actions';
import PropTypes from 'prop-types';
import img from 'assets/img/User Image - Edit.png';
import decoder from 'jwt-decode';
import UploadEmployeeDocument from './UploadEmployeeDocument';
import ViewDocument from 'container/Document/ViewDocument/ViewDocument.jsx';
import Button from 'components/Button';
import Modal from 'components/Modal';
import EditUser from 'container/Users/EditUser';
class ViewUserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            display: 'display-none',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    handleDelete() {
        this.setState({
            display: 'display-block'
        });
    }

    handleYes() {
        var myJSONObject = {
            _id: this.props.data._id
        };

        this.props.deleteData(myJSONObject);
        
        this.props.history.push(`/${this.state.loggedin}`);

        this.setState({
            display: 'display-none'
        });
    }

    handleNo() {
        this.setState({
            display: 'display-none'
        });
    }
    componentDidMount() {
        request(
            {
                url: 'http://localhost:4000/images',
                method: 'POST',
                json: true, // <--Very important!!!
                body: { email: this.props.data.email }
            },
            function(error, response, body) {
                console.log(response);

                if (body.data) {
                    this.setState({
                        image: body.data.image
                    });
                }
            }.bind(this)
        );
    }
    render() {
        const image = <img src={this.state.image} alt="user" />;

        return (
            <div className="view-user">
                <div className="title d-flex">
                    <h3>{this.props.data.name}</h3>
                    <div className="d-flex">
                        <Button
                            className="button--size-normal button--gradient-primary"
                            buttonName="Users' List"
                        />
                        <UploadEmployeeDocument email={this.props.data.email} />
                    </div>
                </div>
                <div className="view-user-details">
                    <div className="view-user--detail">
                        <p className="detail-info">
                            Name: {this.props.data.name}
                        </p>
                        <p className="detail-info">
                            Department: {this.props.data.department}
                        </p>
                        <p className="detail-info">
                            Role: {this.props.data.role}
                        </p>
                        <p className="detail-info">
                            Address: {this.props.data.address}
                        </p>
                        <p className="detail-info">
                            Phone no: {this.props.data.contact}
                        </p>
                        <p className="detail-info">
                            Email: {this.props.data.email}
                        </p>
                        <p className="detail-info">
                            Date of Birth: {this.props.data.dob}
                        </p>
                        <p className="detail-info">
                            Age: {this.props.data.age}
                        </p>
                    </div>

                    <div className="image-user">
                        {image}
                        <div className="buttons d-flex justify-content-between">
                            <div className="buttons--button">
                                <Button
                                    className="button--size-normal button--gradient-secondary1"
                                    buttonName="Delete"
                                    handleClick={e => this.handleDelete(e)}
                                />
                            </div>
                            <div className="buttons--button">
                                <EditUser />
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    label="Are you sure you want to delete?"
                    className={this.state.display}
                    handleYes={this.handleYes.bind(this)}
                    handleNo={this.handleNo.bind(this)}
                />

                <div className="view-document">
                    <ViewDocument
                        individual={true}
                        email={this.props.data.email}
                    />
                </div>
            </div>
        );
    }
}

ViewUserTable.propTypes = {
    deleteData: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    response: state.getdata.response
})


export default connect(mapStateToProps, {deleteData})(withRouter(ViewUserTable));
