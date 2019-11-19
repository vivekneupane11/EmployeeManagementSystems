import express from "express";
const userroute = express.Router();
//local packages
import adaptRequest from "../../globalHelpers/adapt-request";
import usersEndPointHandlers from "../../users";
//Importing local login Routes
import userloginroute from "../login & reset-password/routes/login.routes";

userroute.all("/users", usersController);
userroute.get("/users/:id", usersController);
userroute.use("/users", userloginroute);

function usersController(req, res, next) {
  const httpMethods = adaptRequest(req);
  usersEndPointHandlers({ httpMethods })
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
          error: error
        });
    });
}
module.exports = userroute;
