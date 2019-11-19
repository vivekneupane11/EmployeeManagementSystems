import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getdata } from 'actions';
import decoder from 'jwt-decode';
import ProfileDetails from './ProfileDetails';
import './style.scss';
import request from 'request';

export class ProfileUpdate extends Component {
    constructor(props) {
        super(props);
        const token_id = decoder(localStorage.getItem('token_id'));
        this.state = {
            image: '',
            loggedin: token_id.role.toLowerCase(),
            id: token_id.id,
            _id: '',
            name: '',
            email: '',
            password: '',
            age: '',
            dob: '',
            address: '',
            contact: '',
            deleted: '',
            data: {name:"eaa"},
            token_id: token_id
        };
    }

    async componentDidMount() {
        var myJSONObject = {
            _id: this.state._id,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            age: this.state.age,
            dob: this.state.dob,
            contact: this.state.contact,
            address: this.state.address,
            deleted: this.state.deleted
        };
               
        request(
            {
                url: 'http://localhost:4000/getdata',
                method: 'GET',
                json: true, // <--Very important!!!
                body: myJSONObject
            },
            function(error, response, body) {
                const datas = [];
                response.body.data.map(data => {
                    const obj = {
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.role,
                        department: data.department,
                        age: data.age,
                        dob: data.dob,
                        contact: data.contact,
                        address: data.address,
                        password: data.password,
                        deleted: data.deleted
                    };

                    if (data._id === this.state.id) {
                        this.setState({
                            data: obj
                        });
                    }
                });
            }.bind(this)
        );
        request(
            {
                url: 'http://localhost:4000/images',
                method: 'POST',
                json: true, // <--Very important!!!
                body: { email: this.state.token_id.email }
            },
            function(error, response, body) {
                console.log(response);
                if (body.data){
                    this.setState({
                    image: body.data.image
                });
                }
               
            }.bind(this)
        );
    }

    handleEdit(e) {
        e.preventDefault();
        this.props.history.push(`/${this.state.loggedin}/edituser`, this.state.data);
    } 
    
    render() {     
        return (     
                          
            <ProfileDetails
                data={this.state.data}
                image={this.state.image}
                handleEdit={e => this.handleEdit(e)}
            />
        );
    }
}
ProfileUpdate.propTypes = {
    getdata: PropTypes.func,
    datas: PropTypes.array
    
}

const mapStateToProps= state => ({
    datas: state.getdata.datas
})


export default connect(mapStateToProps,{ getdata })(withRouter(ProfileUpdate));
