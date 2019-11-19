import request from 'request';
const axios = require('axios');

export const getdata = () => dispatch => {
    axios.get('http://localhost:4000/getdata')
    .then(function (response) {
        const datas=[];
        response.data.data.map(data => {
            const obj = [
                {
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                    department: data.department,
                    age: data.age,
                    dob: data.dob,
                    contact: data.contact,
                    address: data.address,
                    password: data.password,
                    deleted: data.deleted
                }
            ];
            if (data.deleted != true) {
                Array.prototype.push.apply(datas, obj);
            }
        });

        dispatch({
            type: 'GET_DATA',
            payload: datas
        })
    })
    .catch(function (error) {        
        alert(error);
    })
}

export const sendMail = (obj) => dispatch => {
    request(
        {
            url: 'http://localhost:4000/resetpassword/sendlinktoemail',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'sgdjajdajdjasdjas'
            },
            method: 'POST',
            json: true,
            body: obj
        },
        (error, response) => {
           
            dispatch({
                type: 'SEND_EMAIL',
                payload: obj,
                response: response
            })
            
        }
    );
};

export const createUser = myJSONObject => dispatch => {
    request(
        {
            url: 'http://localhost:4000/register',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            console.log(response);
            dispatch({
                type: 'CREATE_USER',
                payload: myJSONObject,
                response: response
            });
        }
    );
};

export const updateData = myJSONObject => dispatch => {
    request(
        {
            url: 'http://localhost:4000/updatedata',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'UPDATE_DATA',
                response: response
            });
            console.log(body, response, error);
            alert(response.body);
        }
    );
};

export const getdeptdata = () => dispatch => {
    var myJSONObject = {
        _id: '',
        name: '',
        depthead: ''
    };

    request(
        {
            url: 'http://localhost:4000/deptgetdata',
            method: 'GET',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            const datas = [];
            response.body.data.map(data => {
                const obj = [
                    {
                        _id: data._id,
                        name: data.name,
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
            url: 'http://localhost:4000/department',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type: 'CREATE_DEPT',
                payload: myJSONObject,
                response: response.body
            });
        }
    );
};

export const updateDept = (myJSONObject) => dispatch => {
    request({
        url: `http://localhost:4000/department/${myJSONObject._id}`,
        method: "PUT",
        json: true,   // <--Very important!!!
        body: myJSONObject
    }, function (error, response, body) {
        dispatch({
            type: 'UPDATE_DEPT',
            payload: myJSONObject,
            response: response.body
        })
    });
}


export const login = (myJSONObject) => dispatch => {
    request(
        {
            url: 'http://localhost:4000/login',
            method: 'POST',
            json: true,
            body: myJSONObject
        },
        (error, response) => {
            let errors = {};
            dispatch({
                type: 'LOGIN',
                response: response,
            })
        }
    );
}

export const verifyToken = (tokenObj) => dispatch => {
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
                response : response
            })
        }
    );
}

export const updatePassword = (obj) => dispatch => {
    request(
        {
            url: 'http://localhost:4000/resetpassword/updatepassword',
            method: 'POST',
            json: true,
            body: obj
        },
        (error, response) => {
            dispatch({
                type: 'UPDATE_PASSWORD',
                response: response
            })
        }
    );
}

export const deleteData= (myJSONObject) => dispatch =>{
    request(
        {
            url: 'http://localhost:4000/deletedata',
            method: 'POST',
            json: true, // <--Very important!!!
            body: myJSONObject
        },
        function(error, response, body) {
            dispatch({
                type:'DELETE_DATA',
                response: response
            })
        }
    );
}

export const deleteDept= (myJSONObject) => dispatch =>{
    request({
        url: `http://localhost:4000/department/${myJSONObject._id}`,
        method: "DELETE",
        json: true,   // <--Very important!!!
    }, function (error, response, body){
        dispatch({
            type:'DELETE_DEPT',
            response: response,
        })
    })
}




