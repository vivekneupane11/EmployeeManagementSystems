import React from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../../../components/Input';
import Button from 'components/Button';

class DeptTable extends React.Component {
    constructor(props) {
        super(props)

        this.state={
            currentPage: 1,
            itemsPerPage:10,
        }
    }


    renderTable = () => {
        if (this.props.datas){
            const { currentPage, itemsPerPage}  = this.state;
            const indexOfLastUser = currentPage * itemsPerPage;
            const indexOfFirstUser = indexOfLastUser - itemsPerPage;
            const currentItems= this.props.datas.slice(indexOfFirstUser, indexOfLastUser);
            
       
            return currentItems.map(data=>{

                return(
                    <tr key={data._id}>
                        <td className="name">{data.name}</td>
                        <td>{data.depthead}</td>
                        <td><Button 
                                className="button--size-normal button--gradient-primary" 
                                handleClick={(e)=> {this.handleClick(e, data)}}
                                buttonName="View Details"/>
                        </td>
                    </tr>
                    
                )
            })
        }
        
    }

    renderPageNumbers = ()=>{
        const pageNumbers = [];
        if (this.props.datas){            
            for (let i = 1; i <= Math.ceil(this.props.datas.length / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
            }
        }
       
        pageNumbers.map(number => {
            return (
            <li
                key={number}
                id={number}
                className={(this.state.currentPage === number ? 'page-active ' : '') + 'page-item'}
                onClick={(e) => this.handlePageClick(e)}>                 
                {number}              
            </li>
            );
        });
    }

    handleClick(e,data){
        e.preventDefault();
        this.setState({
            data: data
        })
        this.props.history.push(`/admin/viewdept/${data._id}`,data);
      
    }

    handlePageClick(event) {
        this.setState({
          currentPage: Number(event.target.id)
        });
    }


    render() {        
        console.log(this.props)
        return (
            <div className="dept-table">
                <h3>Department List</h3>
                <div className="search">
                    <Input type="text" name="search" placeholder="Search">
                        <i className="icon-search"/>
                    </Input>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Depatment Head</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>

                <ul id="page-numbers" className="pagination">
                    <li className="page-item">
                        <i className="icon-triangle-left"></i>
                    </li>
                    {this.renderPageNumbers()}
                    <li className="page-item">
                        <i className="icon-triangle-right"></i>
                    </li>
                </ul>

            </div>
        )
    }

}

export default withRouter(DeptTable);
