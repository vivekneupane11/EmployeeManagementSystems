import express from "express";
const userloginroute = express.Router();
//local packages
import adaptRequest from "../../../globalHelpers/adapt-request";
import loginEndpointHandler from "../../login & reset-password/";

userloginroute.post("/login", loginController);
userloginroute.patch("/reset-password/:token", loginController);
userloginroute.put("/sendlinktomail", loginController);

function loginController(req, res, next) {
  console.log("res");

  const httpMethods = adaptRequest(req);
  loginEndpointHandler({ httpMethods })
    .then(({ headers, statusCode, data }) => {
      res
        .set(headers)
        .status(statusCode)
        .send(JSON.stringify(data));
    })
    .catch(error => {
      res
        .set({ "Content-Type": "application/json" })
        .status(500)
        .send({
          success: false,
          error
        });
    });
}

//exported to user.routes
module.exports = userloginroute;
