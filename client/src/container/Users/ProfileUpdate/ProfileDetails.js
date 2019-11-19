import React from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import img from 'assets/img/dummy.jpeg';
import decoder from 'jwt-decode';
import EditUser from 'container/Users/EditUser';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ProfileDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 'display-none',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    render() {
        return (
            <div className="view-user">
                <div className="title d-flex">
                    <h3>{this.props.data.name}</h3>
                </div>
                <div className="view-user-details col-md-12">
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
                        <img
                            className="img-responsive"
                            src={this.props.data.imagePath}
                            alt="profile"
                        />
                        <div className="buttons d-flex justify-content-between">
                            <div className="buttons--button">
                                {/* <Button
                                    className="button--size-small button--gradient-secondary2"
                                    buttonName="Edit"
                                    handleClick={this.props.handleEdit}
                                /> */}

                                <EditUser />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ProfileDetails);
