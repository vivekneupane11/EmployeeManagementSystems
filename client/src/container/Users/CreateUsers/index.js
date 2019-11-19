import React from 'react';
import CreateUserForm from './CreateUserForm';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createUser, sendMail, getdeptdata} from 'actions';
import decoder from 'jwt-decode';
import './style.scss';

export class CreateUsers extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            department: '',
            role: '',
            email: '',
            emailvalid: '',
            namevalid: '',
            datas: [],
            _id: '',
            deptname: '',
            depthead: '',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    componentDidMount(){
        this.props.getdeptdata();
    }

    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        });

        this.validateInput(name, value);
    }

    validateInput = (name, value) => {
        if (name == 'username') {
            if (/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/.test(value)) {
                this.setState({ namevalid: 'valid' });
            } else {
                this.setState({ namevalid: 'invalid' });
            }
        } else if (name == 'email') {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.setState({ emailvalid: 'valid' });
            } else {
                this.setState({ emailvalid: 'invalid' });
            }
        }
    
        else if (name == 'email'){
            if ((/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(value)){
                this.setState({emailvalid: 'valid'})
            }
            else{
                this.setState({emailvalid: 'invalid'})
            }
        }               
    }

    generatePassword(){        
        var length = 8,
            charset =
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
            retVal = '';
        for (var i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }

        return retVal;
    }

    buttonClick(e) {
        e.preventDefault();

        const password = this.generatePassword();

        if (
            this.state.email != '' &&
            this.state.username != '' &&
            this.state.emailvalid === 'valid' &&
            this.state.namevalid === 'valid'
        ) {
            var myJSONObject = {
                name: this.state.username,
                email: this.state.email,
                password: password,
                role: this.state.role,
                department: this.state.department
            };

            this.props.createUser(myJSONObject); //redux for calling api to add data
            const obj = {
                email: this.state.email
            };
    
            this.props.sendMail(obj);
            setTimeout(() => {
                
              }, 5000);           
           
        }
        
        else if(this.state.emailvalid ==="invalid")
        { 
            console.log("email invalid")
        }
        else if(this.state.namevalid ==="invalid")
        { 
            console.log("name invalid")
        }
    }

    selectValue(name, title) {
        this.setState({
            [title]: name
        });
    }

    render() {
        return (           
           <CreateUserForm 
                handleChange={(e) => this.handleChange(e)} 
                emailvalid={this.state.emailvalid} 
                namevalid={this.state.namevalid}
                onClick={(e) => this.buttonClick(e)}
                dropdown={this.props.deptdatas}
                selectValue={this.selectValue.bind(this)}
                loggedin={this.state.loggedin}
            />
        );
    }
}

CreateUserForm.propTypes= {
    createUser : PropTypes.func.isRequired,
    sendMail: PropTypes.func,
    getdeptdata: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    deptdatas: state.getdata.deptdatas,
    data: state.createdata.data,
    responsea: state.getdata.response,
    responseb: state.createdata.response
})

export default connect(mapStateToProps, { createUser, sendMail, getdeptdata})(CreateUsers);
