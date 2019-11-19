import React, { Component } from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateDept } from 'actions';
import EditDeptForm from './EditDeptForm';

import './style.scss';

export class EditDepart extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            _id:"",
            name:"",
            depthead:""
        }
    }

    componentDidMount(){
        const propdata = this.props.location.state;
        this.setState({
            _id: propdata._id,
            name: propdata.name,
            depthead:propdata.depthead,
            namevalid:"",
            deptheadvalid:"",
        })
    }

    onChange(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name] : value
        })

        this.validation(name,value);
        
    }

    validation(name,value){
      
        if (name == 'name'){
            if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
                this.setState({namevalid: 'valid'})
            }
            else{
                this.setState({namevalid: 'invalid'})
            }
        }

        else if (name == 'depthead'){
            if ((/^[A-Z][a-z]+(([',. -][A-Z][a-z])?[a-zA-Z]*)*$/).test(value)){
                this.setState({deptheadvalid: 'valid'})
            }
            else{
                this.setState({deptheadvalid: 'invalid'})
            }
        }       
    }


    handleClick(e){
        e.preventDefault();
        const state=this.state;
      
        var myJSONObject = {
            "_id" : this.state._id,
            "name": this.state.name,
            "depthead": this.state.depthead
        };

        if  ((state.namevalid ==="" || state.namevalid === "valid") &&
            (state.deptheadvalid =="" || state.deptheadvalid ==="valid")){
            
            this.props.updateDept(myJSONObject);
                
            this.props.history.push('/admin/listdept');
        }

        else{
            alert("invalid");
        }      
        
    }
    
    render() {
        return (
            <EditDeptForm onChange={this.onChange.bind(this)} data = {this.state} handleClick={this.handleClick.bind(this)}/>
        )
    }
}

EditDepart.propTypes={
    updateDept: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    response: state.createdata.response
})

export default connect(mapStateToProps, { updateDept })(withRouter(EditDepart))
