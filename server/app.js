//Third party Packages

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const bodyparser = require("body-parser");

//Database connecter
require("./helper/db.connect").makeDatabase(app);

//Local Packages
const userRoute = require("./users/routes/registration.route");
const resetPasswordroutes = require("./users/routes/resetpassword.route");
const usercrudRoute = require("./users/routes/crud.route");
const deptcrudRoute = require("./department/department.route");
const documentRoute = require("./document-upload/routes/document-upload");
const searchbarRoute = require("./searchbar");
const ImageUpload = require("./image-upload/routes/image-upload");
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
//   next();
// });
// app.use('/home',(req,res)=>{
//   res.sendFile('/home/prelisa/Videos/employee_mgmt_system/server/search.html');
// })

//Middleware to register database obj in req.db
app.use((req, res, next) => {
  req.db = app.locals.database;
  next();
});

//body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json()); //(FOR POST/PUT) //gets the data and encode it to json object//connecting to database

app.use(cors());

//  All local Routes
app.use(userRoute);
app.use("/resetpassword", resetPasswordroutes);
app.use(usercrudRoute);
app.use(deptcrudRoute);
app.use(documentRoute);
app.use(searchbarRoute);
app.use(ImageUpload);

//Global error handling
app.use(function(error, req, res, next) {
  switch (error.statusCode) {
    case 412:
      res.status(412).json({
        status: 412,
        message: {
          error: error.details[0].message,
          success: false
        }
      });
      break;
    case 405:
      res.status(405).json({
        status: 405,
        message: {
          error: error.message,
          success: false
        }
      });
      break;
    case 401:
      res.status(401).json({
        status: 401,
        message: {
          error: error,
          success: false
        }
      });
      break;
    case 204:
      res.status(204).json({
        status: 204,
        message: {
          error: error.message,
          success: false
        }
      });
      break;
    case 500:
      res.status(500).json({
        status: 500,
        message: {
          error: error.message,
          success: false
        }
      });
      break;
  }

  // res.send("From app" + error + error.status);
});

module.exports = app;
