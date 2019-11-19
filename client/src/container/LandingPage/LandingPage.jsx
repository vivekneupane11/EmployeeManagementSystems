import React from 'react';
import { withRouter } from 'react-router-dom';
import bg from 'assets/img/bg.jpg';
import LoginImage from 'components/LoginImage/index.jsx';
import 'assets/styles/app.scss';

class LandingPage extends React.Component {
    render() {
        return (
            <div>
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
            </div>
        );
    }
}

export default withRouter(LandingPage);
