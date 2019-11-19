import React from 'react';
import '../../assets/styles/error.scss';
import { FaExclamationTriangle } from 'react-icons/fa';

const Toaster = props => {
    return (
        <div className={props.className}>
            <FaExclamationTriangle /> <span>{props.className}</span>:{' '}
            {props.errorMessage}
        </div>
    );
};
export default Toaster;
