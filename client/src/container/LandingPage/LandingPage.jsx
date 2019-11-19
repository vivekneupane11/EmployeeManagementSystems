import React from 'react';
import bg from 'assets/img/bg.jpg';
import 'assets/styles/app.scss';
import LoginImage from 'components/LoginImage/index.jsx';
import { withRouter } from 'react-router-dom';
import decoder from 'jwt-decode';
import Auth from 'utils/auth';

class LandingPage extends React.Component {
    componentDidMount() {
        const Auto = new Auth();
        const val = Auto.loggedIn();
        if (val) {
            const role = decoder(localStorage.getItem('token_id')).role;
            this.props.history.push(`${role}`);
        }
    }
    render() {
        return (
            <div>
                <div className="bg-color">
                    <div className="container-outer">
                        <div className="dr">
                            <LoginImage url={bg} />
                            <div className="form-box">
                                <div>{this.props.children}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(LandingPage);
