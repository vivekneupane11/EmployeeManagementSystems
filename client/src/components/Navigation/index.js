import React, { Component } from 'react';
import './style.scss';
import img from 'assets/img/dummy.jpeg';
import { withRouter } from 'react-router-dom';
import AuthHelperMethods from 'utils/auth';
import decoder from 'jwt-decode';
import Flyout from 'components/Flyout';
import { getdata } from 'actions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Navigation extends Component {
    state = {
        redirect: false,
        showFlyout: false
    };

    componentDidMount() {
        this.props.getdata();
    }

    handleClick() {
        const Auth = new AuthHelperMethods();
        Auth.logout();
        this.props.history.push('/');
        // window.location.reload();
    }

    showFlyout(e) {
        e.preventDefault();
        const { showFlyout } = this.state;

        showFlyout
            ? this.setState({ showFlyout: false })
            : this.setState({ showFlyout: true }, () => {
                  document.addEventListener('click', this.hideFlyout);
              });
    }

    hideFlyout = () => {
        this.setState({ showFlyout: false }, () => {
            document.removeEventListener('click', this.hideFlyout);
        });
    };

    profile() {
        const obj = decoder(localStorage.getItem('token_id'));
        const loggedin = obj.role.toLowerCase();
        var thedata = {};
        this.setState({
            showFlyout: false
        });
        console.log(this.props.datas);

        this.props.datas.map(data => {
            if (obj.id === data._id) {
                thedata = data;
            }
        });

        this.props.history.push(`/${loggedin}/profile`, thedata);
    }

    render() {
        const obj = decoder(localStorage.getItem('token_id'));
        const name = obj.name;
        const loggedin = obj.role.toLowerCase();
        return (
            <div className="navigations">
                <nav className="navbar navbar-expand-lg navbar-custom">
                    <div className="custom-nav">
                        <div className="navbar-logo navbar-brand">Company</div>
                        <div className="user-functions">
                            <div className="username">{name}</div>
                            <div className="image-icon d-flex align-items-center">
                                <div
                                    onClick={e => {
                                        this.showFlyout(e);
                                    }}
                                    className="img-div"
                                >
                                    <img
                                        className="user-image"
                                        src={img}
                                        alt="x"
                                    />
                                </div>

                                <i className="icon-triangle-down" />
                            </div>

                            {this.state.showFlyout && (
                                <Flyout
                                    loggedin={loggedin}
                                    handleClick={e => this.handleClick(e)}
                                    profile={e => this.profile(e)}
                                />
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

Navigation.propTypes = {
    getdata: PropTypes.func
};

const mapStateToProps = state => ({
    datas: state.getdata.datas
});

export default connect(
    mapStateToProps,
    { getdata }
)(withRouter(Navigation));
