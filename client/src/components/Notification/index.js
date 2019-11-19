import React from 'react';
import './index.scss';
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }
    componentDidMount() {
        this.setState({ name: 'show' });
        setTimeout(() => {
            this.setState({ name: '' });
        }, 2000);
    }
    render() {
        const className = `${this.state.name}`;
        return (
            <div>
                <div id="snackbar" className={className}>
                    {this.props.message}
                </div>
            </div>
        );
    }
}

export default Notification;
