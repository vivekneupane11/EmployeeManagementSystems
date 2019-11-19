import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteDept } from 'actions';
import PropTypes from 'prop-types';
import decoder from 'jwt-decode';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ViewDeptTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: 'display-none',
            loggedin: decoder(
                localStorage.getItem('token_id')
            ).role.toLowerCase()
        };
    }

    handleDelete() {
        this.setState({
            display: 'display-block'
        });
    }

    handleYes() {
        var myJSONObject = {
            _id: this.props.data._id
        };

        this.props.deleteDept(myJSONObject);
        setTimeout(() => {
            this.props.history.push('/admin/listdept', {
                value: false,
                message: `Department ${this.props.data.departmentName} deleted successfully`
            });
        }, 800);

        this.setState({
            display: 'display-none'
        });
    }

    handleNo() {
        this.setState({
            display: 'display-none'
        });
    }

    render() {
        return (
            <div className="view-dept">
                <div className="d-flex justify-content-end">
                    {' '}
                    <Link to="/admin/listdept">Go Back</Link>
                </div>
                <div className="title d-flex">
                    <h3>Details</h3>

                    {this.state.loggedin === 'admin' && (
                        <div className="buttons">
                            {/* <div>
                                <Button
                                    className="button--size-normal button--gradient-secondary1"
                                    buttonName="Delete"
                                    handleClick={e => this.handleDelete(e)}
                                />
                            </div> */}
                            <div>
                                <Button
                                    className="button--size-normal button--gradient-secondary2"
                                    buttonName="Edit"
                                    handleClick={this.props.handleEdit}
                                />
                            </div>
                        </div>
                    )}
                </div>
                <div className="view-dept-table">
                    <div className="view-dept--detail">
                        <p className="detail-info">
                            Name: {this.props.data.departmentName}
                        </p>
                    </div>
                </div>

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

ViewDeptTable.propTypes = {
    deleteDept: PropTypes.func.isRequired,
    response: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    response: state.getdata.res
});

export default connect(
    mapStateToProps,
    { deleteDept }
)(withRouter(ViewDeptTable));
