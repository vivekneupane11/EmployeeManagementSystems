import React from 'react';
import Input from '../../../components/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteData } from 'actions';
import PropTypes from 'prop-types';
import decoder from 'jwt-decode';
import Button from 'components/Button';
import request from 'request';
import Modal from 'components/Modal';
import ExportData from 'components/ExportData/index';
class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            itemsPerPage: 10,
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase(),
            display: 'display-none',
            _id: ''
        };
    }

    renderTable = () => {
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastUser = currentPage * itemsPerPage;
        const indexOfFirstUser = indexOfLastUser - itemsPerPage;
        if (this.props.datas){
            const currentItems = this.props.datas.slice(
                indexOfFirstUser,
                indexOfLastUser
            );

            return currentItems.map(data => {
                if(data.role !== "admin"){
                    return (
                        <tr key={data._id}>
                            <td className="name">{data.name}</td>
                            <td>
                                {data.email.length > 20
                                    ? data.email.substring(0, 20 - 3) + '...'
                                    : data.email}
                            </td>
                            <td>{data.role}</td>
                            <td>{data.department}</td>
                            <td>
                                <Button
                                    className="button--size-small button--gradient-primary"
                                    handleClick={e => {
                                        this.handleClick(e, data);
                                    }}
                                    buttonName="View"
                                />
                            </td>
                            <td>
                                <Button
                                    className="button--size-small button--gradient-secondary1"
                                    handleClick={e => {
                                        this.handleDelete(e, data);
                                    }}
                                    buttonName="Delete"
                                />
                            </td>
                        </tr>
                    );
                }
            });
        }
    };

    handleClick(e, data) {
        this.props.history.push(
            `/${this.state.loggedin}/viewuser/${data._id}`,
            data
        );
    }

    toEmployeeHierarchy(e) {
        e.preventDefault();
        this.props.history.push(`/${this.state.loggedin}/ehs`);
    }

    handlePageClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    handleDelete(e, data) {
        e.preventDefault();
        this.setState({
            display: 'display-block',
            _id: data._id
        });
    }

    handleYes() {
        var myJSONObject = {
            _id: this.state._id
        };

        this.props.deleteData(myJSONObject);
        
        this.setState({
            display: 'display-none'
        });

        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    handleNo() {
        this.setState({
            display: 'display-none'
        });
    }

    renderPageNumbers = () => {
    const pageNumbers = [];
    if (this.props.datas){
        for (let i = 1; i <= Math.ceil(this.props.datas.length / this.state.itemsPerPage); i++) {
            pageNumbers.push(i);
          }
    }
    return pageNumbers.map(number => {
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
    render() {
        return (
            <div className="user-table">
                <h3>Employee List</h3>

                <div className="search">
                    <Input type="text" name="search" placeholder="Search">
                        <i className="icon-search"/>
                    </Input>
                    <div className="d-flex">
                    <ExportData datas={this.props.datas}/>
                    <Button className="button--gradient-primary button--size-big ml-2" handleClick={(e)=>{this.toEmployeeHierarchy(e)}} buttonName="Employee Hierarchy"/>
                    </div>
                </div>
                <table className="table table-striped table-responsive">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>{this.renderTable()}</tbody>
                </table>

                <ul id="page-numbers" className="pagination">
                    <li className="page-item">
                        <i className="icon-triangle-left" />
                    </li>
                    {this.renderPageNumbers()}
                    <li className="page-item">
                        <i className="icon-triangle-right" />
                    </li>
                </ul>

                <Modal
                    label="Are you sure you want to delete?"
                    className={this.state.display}
                    handleYes={this.handleYes.bind(this)}
                    handleNo={this.handleNo.bind(this)}
                />
            </div>
        );
    }
}

UserTable.propTypes = {
    deleteData: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
}

const mapStateToProps= state => ({
    response: state.getdata.response
})


export default connect(mapStateToProps, {deleteData})(withRouter(UserTable));
