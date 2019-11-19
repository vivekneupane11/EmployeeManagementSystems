import React, { Component } from 'react';
import './style.scss';

export class Flyout extends Component {
    render() {
        const role = this.props.loggedin.toUpperCase();;
        return (
            <div className="flyout-background">
                <div className="flyout">
                    
                    <ul className="flyout--list">                        
                        <div className="py-3 border-bottom">{role}</div>
                        {(this.props.loggedin === 'hr' ||
                            this.props.loggedin === 'employee') && (
                            <li onClick={this.props.profile}>Profile</li>
                        )}
                        <li onClick={this.props.handleClick}>Logout</li>
                    </ul>
            </div>
            </div>
            
        );
    }
}

export default Flyout;
