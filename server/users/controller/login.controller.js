//Third Party Packages
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//Local Packages
const validation = require("../../helper/validation.controller");
//func() to login validated user

async function loginUser(req, res, next) {
  try {
    const USERS = req.db.collection("users");
    //Validate user before login
    const { error } = validation.joivalidatelogin(req.body);
    if (error) {
      error.statusCode = 412; //Precondition failed
      return next(error);
    }

    //Check if email exist
    const loginuser = await USERS.findOne({ email: req.body.email });
    if (!loginuser)
      return res.status(401).json({
        status: 401,
        message: {
          error: "Email not registered",
          success: false
        }
      });
    //check if password match
    isPasswordValid = await bcrypt.compare(
      req.body.password,
      loginuser.password
    );
    if (!isPasswordValid)
      return res.status(401).json({
        status: 401,
        message: {
          error: "Password you have entered is incorrect",
          success: false
        }
      });

    const token = jwt.sign(
      { id: loginuser._id, email: loginuser.email, name: loginuser.name, role: loginuser.role },
      process.env.SECRET_KEY
    );

    res.status(200).json({
      status: 200,
      message: {
        error: null,
        data: loginuser,
        token: token,
        success: true
      }
    });
  } catch (error) {
    error.statusCode = 500; //INtrenal server error
    error.message = "Internal Server error catched";
    return next(error);
  }
}

module.exports = {
  loginUser: loginUser
};
