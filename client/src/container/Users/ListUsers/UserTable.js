import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteData, notification } from 'actions';
import PropTypes from 'prop-types';
import decoder from 'jwt-decode';
import Button from 'components/Button';
import Modal from 'components/Modal';
import ExportData from 'components/ExportData/index';
import Search from 'components/Search';
import Notification from 'components/Notification';
class UserTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: '',
            currentPage: 1,
            itemsPerPage: 10,
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase(),
            display: 'display-none',
            _id: ''
        };
    }
    componentDidMount() {
        this.setState({ notification: this.props.notification });
    }
    renderTable = () => {
        const { currentPage, itemsPerPage } = this.state;
        const indexOfLastUser = currentPage * itemsPerPage;
        const indexOfFirstUser = indexOfLastUser - itemsPerPage;
        let currentItems = [];
        if (this.props.datas) {
            currentItems = this.props.datas.slice(
                indexOfFirstUser,
                indexOfLastUser
            );
        } else if (this.props.responseData) {
            currentItems = this.props.responseData.slice(
                indexOfFirstUser,
                indexOfLastUser
            );
        }

        return currentItems.map(data => {
            if (data.role !== 'admin') {
                return (
                    <tr key={data._id}>
                        <td className="name">
                            {data.username.length > 15
                                ? data.username.substring(0, 15 - 3) + '...'
                                : data.username}
                        </td>
                        <td>
                            {data.email.length > 20
                                ? data.email.substring(0, 20 - 3) + '...'
                                : data.email}
                        </td>
                        <td>{data.role}</td>
                        <td>{data.department}</td>
                        <td className="pl-4 td-button">
                            <Button
                                className="button--size-small button--gradient-primary"
                                handleClick={e => {
                                    this.handleClick(e, data);
                                }}
                                buttonName="View"
                            />
                        </td>
                        <td className="td-button">
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
        if (this.props.datas) {
            for (
                let i = 1;
                i <=
                Math.ceil(this.props.datas.length / this.state.itemsPerPage);
                i++
            ) {
                pageNumbers.push(i);
            }
        } else if (this.props.responseData) {
            for (
                let i = 1;
                i <=
                Math.ceil(
                    this.props.responseData.length / this.state.itemsPerPage
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
    render() {
        let notify;
        if (this.state.notification) {
            if (this.state.notification.length !== 0) {
                notify = true;
            }
        } else notify = false;

        return (
            <div className="user-table">
                {notify && <Notification message={this.state.notification} />}
                <h3>Employee List</h3>

                <div className="search">
                    <Search
                        type="text"
                        name="search"
                        placeholder="Search"
                        onKeyUp={this.props.keyupsearch}
                    />
                    <div className="d-flex flex-wrap">
                        <ExportData datas={this.props.datas} />
                        <Button
                            className="button--gradient-primary button--size-big ml-lg-2 ml-xl-2"
                            handleClick={e => {
                                this.toEmployeeHierarchy(e);
                            }}
                            buttonName="Employee Hierarchy"
                        />
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
};

const mapStateToProps = state => ({
    response: state.getdata.response,
    notification: state.getdata.notification
});

export default connect(
    mapStateToProps,
    { deleteData }
)(withRouter(UserTable));
