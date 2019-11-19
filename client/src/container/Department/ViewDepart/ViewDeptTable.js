import React from 'react';
import request from 'request';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteDept } from 'actions';
import PropTypes from 'prop-types';
import img from 'assets/img/dummy.jpeg';

import Button from 'components/Button';
import Modal from 'components/Modal';

class ViewDeptTable extends React.Component{
    constructor(props) {
        super(props)
        
        this.state = {
            display: "display-none"
        }
    }   

    handleDelete(){
        this.setState({
            display:"display-block"
        })
    }

    handleYes(){
        var myJSONObject={
            "_id" : this.props.data._id
        }

        this.props.deleteDept(myJSONObject);
        setTimeout(() => {
            console.log(this.props.response)
        }, 500);
        
        this.props.history.push('/admin/listdept');
        
        this.setState({
            display:"display-none"
        })
    }

    handleNo(){
        this.setState({
            display:"display-none"
        })
    }  
    
    render(){
        return (
            <div className="view-dept">
                <div className="title d-flex">
                    <h3>Details</h3>
                    <div className="buttons">
                        <div><Button className="button--size-normal button--gradient-secondary1" buttonName="Delete" handleClick={(e)=> this.handleDelete(e)} /></div>
                        <div><Button className="button--size-normal button--gradient-secondary2" buttonName="Edit" handleClick={this.props.handleEdit}/></div>
                    </div>
                </div>
                <div className="view-dept-table">
                    <div className="view-dept--detail">
                        <p className="detail-info">Name: {this.props.data.name}</p>
                        <p className="detail-info">Department Head: {this.props.data.depthead}</p>
                        
                    </div>
                </div>
    
                <Modal 
                    label="Are you sure you want to delete?" 
                    className={this.state.display}
                    handleYes={this.handleYes.bind(this)}
                    handleNo={this.handleNo.bind(this)}/>
            </div>
        )
    }

   
}
ViewDeptTable.propTypes = {
    deleteDept: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    response: state.getdata.res
})


export default connect(mapStateToProps, {deleteDept})(withRouter(ViewDeptTable));

