import React from 'react';
import Input from 'components/Input';
import Button from 'components/Button';


const EditDeptForm = (props) => {
    
    return (
        <div className="edit-dept">
            
            <h3> Edit dept </h3>
            <form className="dept-form" id="deptForm">
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.namevalid}</p>
                        </div>
                        <Input  type="text" 
                                id="name" 
                                className="input-field" 
                                name="name" 
                                onChange={(e)=> {props.onChange(e)}}
                                label="Name"
                                value={props.data.name}
                        />
                    </div>
                    <div className="form-input d-flex flex-column align-items-flex-start justify-content-space-around">
                        <div className="validity">
                            <p>{props.data.deptheadvalid}</p>
                        </div>
                        <Input  type="text" 
                                id="depthead" 
                                className="input-field" 
                                name="depthead"
                                onChange={(e)=> {props.onChange(e)}}
                                label="Department Head"
                                value={props.data.depthead}
                        />
                        
                    </div>                    

                    <div className="submit-button">
                        <Button className="button--size-normal button--gradient-primary" buttonName="Edit" handleClick={(e)=> {props.handleClick(e)}}/>
                    </div>         
                </form>
        </div>
    )
}


export default EditDeptForm;