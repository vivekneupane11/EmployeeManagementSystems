import React from 'react';
import { withRouter } from 'react-router-dom';
import Button from 'components/Button';
import Search from 'components/Search';
import Notification from 'components/Notification';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import decoder from 'jwt-decode';
import { deleteDept } from 'actions';
import PropTypes from 'prop-types';
class DeptTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notification: '',
            currentPage: 1,
            itemsPerPage: 10,
            display: 'display-none',
            _id: '',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }
    handleDelete(e, data) {
        e.preventDefault();
        this.setState({
            display: 'display-block',
            _id: data._id
        });
    }
    componentDidMount() {
        this.setState({ notification: this.props.notification });
    }

    handleYes() {
        var myJSONObject = {
            _id: this.state._id
        };

        this.props.deleteDept(myJSONObject);
        setTimeout(() => {
            window.location.reload();
        }, 1000);

        this.setState({
            display: 'display-none'
        });
    }

    handleNo() {
        this.setState({
            display: 'display-none'
        });
    }

    renderTable = () => {
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastUser = currentPage * itemsPerPage;
        const indexOfFirstUser = indexOfLastUser - itemsPerPage;
        let currentItems = [];
        if (this.props.deptdatas) {
            currentItems = this.props.deptdatas.slice(
                indexOfFirstUser,
                indexOfLastUser
            );
        } else if (this.props.responseData) {
            currentItems = this.props.responseData.data.slice(
                indexOfFirstUser,
                indexOfLastUser
            );
        }
        return currentItems.map(data => {
            return (
                <tr key={data._id}>
                    <td className="name">{data.departmentName}</td>
                    <td className="d-flex">
                        <Button
                            className="button--size-normal button--gradient-primary"
                            handleClick={e => {
                                this.handleClick(e, data);
                            }}
                            buttonName="View Details"
                        />
                        {this.state.loggedin === 'admin' && (
                            <Button
                                className="button--size-normal button--gradient-secondary1 ml-1"
                                handleClick={e => this.handleDelete(e, data)}
                                buttonName="Delete"
                            />
                        )}
                    </td>
                </tr>
            );
        });
    };

    renderPageNumbers = () => {
        const pageNumbers = [];
        if (this.props.deptdatas) {
            for (
                let i = 1;
                i <=
                Math.ceil(
                    this.props.deptdatas.length / this.state.itemsPerPage
                );
                i++
            ) {
                pageNumbers.push(i);
            }
        } else if (this.props.responseData) {
            for (
                let i = 1;
                i <=
                Math.ceil(
                    this.props.responseData.data.length /
                        this.state.itemsPerPage
                );
                i++
            ) {
                pageNumbers.push(i);
            }
        }
        return pageNumbers.map(number => {
            return (
                <li
                    key={number}
                    id={number}
                    className={
                        (this.state.currentPage === number
                            ? 'page-active '
                            : '') + 'page-item'
                    }
                    onClick={e => this.handlePageClick(e)}
                >
                    {number}
                </li>
            );
        });
    };

    handleClick(e, data) {
        e.preventDefault();
        this.setState({
            data: data
        });
        this.props.history.push(`/admin/viewdept/${data._id}`, data);
    }

    handlePageClick(event) {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    handleNotification = e => {
        this.props.history.replace(this.props.location.pathname, null);
    };
    render() {
        let notify;
        if (this.state.notification) {
            if (this.state.notification.length !== 0) {
                notify = true;
            }
        } else notify = false;
        return (
            <div className="dept-table">
                <h3>Department List</h3>
                <div className="search">
                    <Search
                        type="text"
                        name="search"
                        placeholder="Search"
                        onKeyUp={this.props.keyupsearch}
                    />
                </div>
                <div className="d-flex justify-content-end">
                    {notify && (
                        <Notification message={this.state.notification} />
                    )}
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th />
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

DeptTable.propTypes = {
    deleteDept: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    response: state.getdata.res,
    notification: state.getdata.notification
});

export default connect(
    mapStateToProps,
    { deleteDept }
)(withRouter(DeptTable));
