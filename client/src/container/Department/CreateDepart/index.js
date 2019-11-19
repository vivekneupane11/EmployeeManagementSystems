import React,{Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createDept } from 'actions';

import './style.scss';
import DepartmentForm from './DepartmentForm';
import request from 'request';

class CreateDepart extends Component {

    state={
        name:'',
        namevalid:'',        
    }

    handleChange = (event) => {
        const value= event.target.value;
        this.setState({
            name: value
        })

        
        if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
            this.setState({namevalid: 'valid'})
        }
        else{
            this.setState({namevalid: 'invalid'})
        }
        
    }

    handleClick(e){
        e.preventDefault();
        if (this.state.name !== "" && this.state.namevalid==="valid"){
            var myJSONObject = {
               "name": this.state.name,
    
            };

            this.props.createDept(myJSONObject);
            // request({
            //     url: "http://localhost:4000/department",
            //     method: "POST",
            //     json: true,   // <--Very important!!!
            //     body: myJSONObject
            // }, function (error, response, body){
            //     alert(response.body);
            // });
       
            this.props.history.push('/admin/listdept');
        }

        else if (this.state.namevalid === "invalid"){
            alert("invalid");
        }

        else if (this.state.name ===""){
            alert("Field empty");
        }
    }


    render() {
        const {name, namevalid} = this.state;
        return (
            
            <DepartmentForm name={name} namevalid={namevalid} handleChange={this.handleChange} handleClick={(e) => {this.handleClick(e)}}/>
            
        )
    }
}

CreateDepart.propTypes={
    createDept: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    response: state.createdata.response
})
export default connect(mapStateToProps, {createDept}) (withRouter(CreateDepart));
