//Third party package
const joi = require("joi");

//Validation Function using ***JOI***
function joivalidateUser(userinfo) {
  const schema = {
    name: joi
      .string()
      .min(5)
      .max(50)
      .required(),
    email: joi
      .string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: joi
      .string()
      .min(5)
      .max(255)
      .required(),
    role: joi
      .string()
      .min(1)
      .max(15)
      .required(),
    department: joi
      .string()
      .min(1)
      .max(20)
      .required()
  };
  return joi.validate(userinfo, schema);
}

function joiloginUser(logininfo) {
  const schema = {
    email: joi
      .string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: joi
      .string()
      .min(5)
      .max(255)
      .required()
  };
  return joi.validate(logininfo, schema);
}

function joivalidatedepartment(departmentInfo) {
  const schema = {
    name: joi
      .string()
      .min(2)
      .required(),
    depthead: joi.string().min(3)
  };
  return joi.validate(departmentInfo, schema);
}
module.exports = {
  joivalidatedepartment: joivalidatedepartment,
  joivalidateUser: joivalidateUser,
  joivalidatelogin: joiloginUser
};

// regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/)

// {
//     "name":"Nepal",
// "email": "nepal@gmail.com",
// "password": "123345566",
//     "age":22,
//     "address":"Nepal",
//     "contact":9887665443
// }
