import React from 'react';
import './style.scss';

const InputNormal = props => {
    return (
        <div className="input-box">
            <div className="form-group">
                <label className="input--label" htmlFor={props.label}>{props.label}</label>
                <input
                    className="form-control input-form"
                    type={props.type}
                    name={props.name}
                    onChange={props.onChange}
                    value={props.value}
                    placeholder={props.placeholder}
                    required
                />
                <div className="icons-name">{props.children}</div>
            </div>
        </div>
    );
};

export default InputNormal;