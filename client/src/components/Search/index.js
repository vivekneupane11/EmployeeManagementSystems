import React from 'react';
import './style.scss';

const Search = props => {
    return (
        <div className="input-border">
            <div className="form-group">
                <label className="input--label" htmlFor={props.label}>{props.label}</label>
                <i className="icon-search search-icon"></i>
                <input
                    className="form-control input-form"
                    type={props.type}
                    name={props.name}
                    onKeyUp={props.onKeyUp}
                    value={props.value}
                    placeholder={props.placeholder}
                    required
                />
                
            </div>
        </div>
    );
};

export default Search;