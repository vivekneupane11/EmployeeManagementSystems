import React from 'react';
import './style.scss';
import Button from 'components/Button';

const Modal = props => {
    return (
       
        <div className={props.className}>
            <div className="modal-background">
                <div className="label">{props.label}</div>

                <div className="button">
                    <Button
                        className="button--size-normal button--gradient-secondary1"
                        buttonName="Yes"
                        handleClick={props.handleYes}
                    />
                    <Button
                        className="button--size-normal button--gradient-secondary2"
                        buttonName="No"
                        handleClick={props.handleNo}
                    />
                </div>
            </div>
        </div>
       
    );
};

export default Modal;
