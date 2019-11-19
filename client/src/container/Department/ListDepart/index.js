import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getdeptdata } from 'actions';
import { withRouter } from 'react-router-dom';

import DeptTable from './DeptTable';

import './style.scss';

class ListDepart extends Component {   
    constructor(props) {
        super(props);

        this.state = {
            _id: '',
            name: '',
            depthead: '',
            dept: []
        };
    }
        
    componentDidMount(){
        this.props.getdeptdata();    
    } 
    
    render() {
        
        return (
            
            <DeptTable datas= {this.props.deptdatas}/>
        )
    }
}

ListDepart.propTypes={
    getdeptdata: PropTypes.func.isRequired,
}

const mapStateToProps= state => ({
    deptdatas: state.getdata.deptdatas
})
export default connect(mapStateToProps, {getdeptdata}) (withRouter(ListDepart));
