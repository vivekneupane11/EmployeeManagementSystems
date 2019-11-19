import React from 'react';
import '../../assets/styles/button.scss';
const Button = props => {
    return (
        <div className="buttonclass">
            <button
                type="submit"
                className={`btn ${props.className}`}
                onClick={props.handleClick}
                data-dismiss={props.datadismiss}
            >
                {props.buttonName}
                {props.children}
            </button>
        </div>
    );
};
export default Button;
