import React from 'react';
import '../../assets/styles/input.scss';

const Input = props => {
    return (
        <div className="input-box">
            <div className="form-group">
                <input
                    className="form-control"
                    type={props.type}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                    placeholder={props.placeholder}
                    required
                />
                <label htmlFor={props.label}>{props.label}</label>
                <div className="icons-name">{props.children}</div>
            </div>
        </div>
    );
};

export default Input;
