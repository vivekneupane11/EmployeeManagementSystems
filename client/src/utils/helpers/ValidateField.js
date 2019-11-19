const ValidateField = fields => {
    const errors = {};
    const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (Object.keys(fields)[0] === 'email') {
        if (fields['email'] === '') {
            errors['isValidEmail'] = false;
            errors['email'] = 'Email is Empty';
            errors['isEmailEmpty'] = true;
        } else if (!re.test(fields['email'])) {
            errors['isValidEmail'] = false;
            errors['email'] = 'Invalid Email Address';
        } else {
            errors['email'] = '';
            errors['isValidEmail'] = true;
        }
    }
    if (Object.keys(fields)[1] === 'password') {
        if (fields['password'] === '') {
            errors['isValidPassword'] = false;
            errors['password'] = 'Password is Empty';
            errors['isPasswordEmtpy'] = true;
        } else {
            errors['isValidPassword'] = true;
        }
    }
    if (errors['isValidEmail'] && errors['isValidPassword']) {
        errors['isValidForm'] = true;
    }
    if (errors['isEmailEmpty'] && errors['isPasswordEmtpy']) {
        errors['form'] = 'Email and Password is Empty';
        errors['isValidForm'] = false;
    } else if (errors['isEmailEmpty'] && errors['isPasswordEmtpy']) {
        errors['form'] = 'Email and Password is Empty';
        errors['isValidForm'] = false;
    } else if (errors['isEmailEmpty'] && !errors['isPasswordEmtpy']) {
        errors['form'] = 'Email is Empty';
        errors['isValidForm'] = false;
    } else if (!errors['isEmailEmpty'] && errors['isPasswordEmtpy']) {
        errors['form'] = 'Password is Empty';
        errors['isValidForm'] = false;
    } else if (!errors['isValidEmail']) {
        errors['form'] = 'Invalid Email';
        errors['isValidForm'] = false;
    }

    return errors;
};

export default ValidateField;
