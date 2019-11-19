

const ValidateField = (fields) => {
    const errors = {}
    if(fields['password']==='' && fields['confirmPassword']==='' ){
        errors["password"]='Password field is Empty'
         errors["isValidPassword"]=false;  
    } 
    else if(fields['password']===''){
        errors["password"]='Password Field is Empty'
        errors["isValidPassword"]=false;  
    }else if(fields['password'].length<6){
        errors["password"]='Password should be at least 6 characters long'
        errors["isValidPassword"]=false;  
    }
    else if(fields['confirmPassword']===''){
        errors["password"]='Confirm Password Field is Empty'
        errors["isValidPassword"]=false;  
    }
    else if(fields['password']===fields["confirmPassword"]){
        errors["password"]=''
        errors["isValidPassword"]=true;  
    }else{
        errors["password"]='Password do not match'
        errors["isValidPassword"]=false;  
    }
  return errors;
}
  
  export default ValidateField;