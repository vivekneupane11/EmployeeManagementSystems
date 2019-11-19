import request from 'request';
const axios = require('axios');

export const getdata = () => dispatch => {
    axios
        .get('http://localhost:4000/users')
        .then(function(response) {
            const datas = [];

            JSON.parse(response.data.content).map(data => {
                const obj = [
                    {
                        _id: data._id,
                        username: data.username,
                        email: data.email,
                        role: data.role,
                        department: data.department,
                        age: data.age,
                        dob: data.dob,
                        contact: data.contact,
                        address: data.address,
                        password: data.password,
                        deleted: data.deleted,
                        imagePath: data.imagePath
                    }
                ];
                if (data.deleted !== true) {
                    Array.prototype.push.apply(datas, obj);
                }
            });

            dispatch({
                type: 'GET_DATA',
                payload: datas
            });
        })
        .catch(function(error) {
            alert(error);
        });
};

export const sendMail = obj => dispatch => {
    let responses = {};
    let errors = {};
    axios
        .put('http://localhost:4000/users/sendlinktomail', obj)
        .then(response => {
            responses = response;
        })
        .catch(function(error) {
            errors = error;
        })
        .finally(function() {
            dispatch({
                type: 'SEND_EMAIL',
                payload: obj,
                response: responses,
                error: errors
            });
        });
};

export const createUser = myJSONObject => dispatch => {
    request(
        {
            url: 'http://localhost:4000/users',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        (response, error) => {
            dispatch({
                type: 'CREATE_USER',
                payload: myJSONObject,
                response: response ? response : error
            });
        }
    );
};

export const updateData = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/users/?id=${myJSONObject._id}`,
            method: 'PUT',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'UPDATE_DATA',
                response: response
            });
        }
    );
};

export const getdeptdata = () => dispatch => {
    var myJSONObject = {
        _id: '',
        departmentName: ''
    };

    request(
        {
            url: 'http://localhost:4000/departments',
            method: 'GET',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            const datas = [];
            const val = response.body.content;

            val.map(data => {
                const obj = [
                    {
                        _id: data._id,
                        departmentName: data.departmentName,
                        depthead: data.depthead
                    }
                ];
                Array.prototype.push.apply(datas, obj);
            });
            dispatch({
                type: 'GET_DEPT_DATA',
                deptdatas: datas
            });
        }
    );
};

export const createDept = myJSONObject => dispatch => {
    request(
        {
            url: 'http://localhost:4000/departments',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            console.log(response);
            dispatch({
                type: 'CREATE_DEPT',
                payload: myJSONObject,
                response: response.body
            });
        }
    );
};

export const updateDept = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/departments/?id=${myJSONObject._id}`,
            method: 'PUT',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'UPDATE_DEPT',
                payload: myJSONObject,
                response: response.body
            });
        }
    );
};
export const loginRequest = myJSONObject => {
    return {
        type: 'LOGIN_REQUEST',
        myJSONObject
    };
};
export const loginSuccess = response => {
    return {
        type: 'LOGIN_SUCCESS',
        response
    };
};
export const loginFailure = response => {
    console.log('arrived');

    return {
        type: 'LOGIN_FAILURE',
        response
    };
};

export const verifyToken = tokenObj => dispatch => {
    request(
        {
            url: 'http://localhost:4000/resetpassword/verifytoken',
            method: 'POST',
            json: true,
            body: tokenObj
        },
        (error, response) => {
            dispatch({
                type: 'VERIFY',
                response: response
            });
        }
    );
};

export const updatePassword = obj => dispatch => {
    axios
        .patch(`http://localhost:4000/users/reset-password/${obj.token}`, {
            email: obj.email,
            password: obj.password
        })
        .then(response => {
            dispatch({
                type: 'UPDATE_PASSWORD',
                response: response
            });
        });
};

export const deleteData = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/users/?id=${myJSONObject._id}`,
            method: 'DELETE',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'DELETE_DATA',
                response: response
            });
        }
    );
};

export const deleteDept = myJSONObject => dispatch => {
    request(
        {
            url: `http://localhost:4000/departments/?id=${myJSONObject._id}`,
            method: 'DELETE',
            json: true // <--Very important!!!
        },
        function(error, response, body) {
            dispatch({
                type: 'DELETE_DEPT',
                response: response
            });
        }
    );
};

export const searchDept = obj => dispatch => {
    let responses = {};
    let errors = {};
    axios
        .post('http://localhost:4000/searchdept', obj)
        .then(function(response) {
            responses = response;
        })
        .catch(function(error) {
            errors = error;
        })
        .finally(function() {
            dispatch({
                type: 'SEARCH_DEPT',
                response: responses,
                error: errors
            });
        });
};

export const searchUser = obj => dispatch => {
    let responses = {};
    let errors = {};
    axios
        .post('http://localhost:4000/searchuser', obj)
        .then(function(response) {
            responses = response.data;
        })
        .catch(function(error) {
            errors = error;
        })
        .finally(function() {
            dispatch({
                type: 'SEARCH_USER',
                response: responses,
                error: errors
            });
        });
};

export const documents = (formData, config) => dispatch => {
    let responses = {};
    let errors = {};
    axios
        .post('http://localhost:4000/documents', formData, config)
        .then(response => {
            responses = response;
            console.log(response);
            console.log('00');
        })
        .catch(error => {
            responses = error.response;
        })
        .finally(function() {
            dispatch({
                type: 'CREATE_DOCS',
                response: responses,
                error: errors
            });
        });
};

export const getdocuments = (isIndividual, id, role) => dispatch => {
    let responses = {};
    let url = '';
    let myObj = '';
    if (isIndividual) {
        url = `http://localhost:4000/documents/${id}`;
    } else {
        url = `http://localhost:4000/documents/?role=${role}`;
        myObj = {
            email: ''
        };
    }
    axios
        .get(url, myObj)
        .then(response => {
            responses = response;
            console.log(response);
        })
        .catch(error => {
            responses = error.response;
            console.log(error, 'dfasdfasd');
        })
        .finally(function() {
            dispatch({
                type: 'GET_DOCS',
                response: responses
            });
        });
};
export const notification = message => dispatch => {
    dispatch({
        type: 'NOTIFY',
        notification: message
    });
};
