//Third party package
const async = require("async");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "d6F3Efeq";

//local packages

const sendEmail = require("../../helper/mailsender");

async function sendresetlinktoemail(req, res, next) {
  try {
    console.log(req.headers);
    const USERS = req.db.collection("users");
    //check if user exist in our database
    const user = await USERS.findOne({ email: req.body.email });
    if (!user) {
      error.statusCode = 404; //Not Found
      return next(error);
        };
     

    //generate random token
    var token = crypto.randomBytes(24).toString("hex");

    //SEND  MAIL TO VALID USER
    await sendEmail(user, token, res);

    //save users verify token and its expiry date in our database

    await USERS.updateOne(
      { email: user.email },
      {
        $set: {
          resetpasswordtoken: token,
          resetpasswordexpiry: Date.now() + 3600000 //1hours added
        }
      }
    );

    res.status(200).json({
      status: 200,
      message: {
        details: "Email sent successfully",
        success: true
      }
    });
  } catch (error) {
    error.statusCode = 500; //INtrenal server error
    return next(error);
  }
}

function decrypt(text) {
  let decipher = crypto.createDecipher(algorithm, password);
  let dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
}

//Verify token to reset password
async function verifytoken(req, res) {
  const USERS = req.db.collection("users");
  try {
    const nowTime = await Date.now();
    const email = decrypt(req.body.email);
    console.log(email);
    const validtokenuser = await USERS.findOne({
      email: email,
      resetpasswordexpiry: { $gt: nowTime },
      resetpasswordtoken: req.body.token
    });
    console.log(validtokenuser);
    if (validtokenuser) {
      res.json({
        status: 200,
        message: {
          detail: "Found it",
          success: true
        }
      });
    } else {
      res.status(400).json({
        status: 400,
        message: {
          error: "Sorry no valid token holder found",
          success: false
        }
      });
    }
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: {
        error: "No valid token",
        success: false
      }
    });
  }
}

//update  Password after reset password

async function updatePassword(req, res) {
  try {
    //bcrypt password before registration
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const email = decrypt(req.body.email);
    var myquery = { email:email};
    var newvalues = { $set: { password: req.body.password } };
    await req.db
      .collection("users")
      .updateOne(myquery, newvalues, function(err, result) {
        if (err) throw err;
        res.json({
          status: 200,
          detail: {
            message: "Password updated sucessfully",
            success: true
          }
        });
      });
  } catch (err) {
    res.status(500).json({
      status: 500,
      details: {
        error: "Internal server error",
        success: false
      }
    });
  }
}

module.exports = {
  sendresetlinktoemail: sendresetlinktoemail,
  verifytoken: verifytoken,
  updatePassword: updatePassword
};
