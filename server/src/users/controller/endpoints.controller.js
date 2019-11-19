import usersController from "./users.controller";
import makeHttpError from "../../globalHelpers/http-error";
import validateUserInfo from "../userhelper/validateUser";
import { passwordHasher, genToken } from "../../globalHelpers/bcrypter.helper";
import sendMail from "../../globalHelpers/mailsender";
export default function userEndpointhandler({ userscontroller }) {
  return async function({ httpMethods }) {
    switch (httpMethods.method) {
      case "GET":
        return getUsers({ httpMethods });
      case "POST":
        return postUsers({ httpMethods });
      case "PUT":
        return putUsers({ httpMethods });
      case "DELETE":
        return deleteUsers({ httpMethods });
    }
  };

  async function getUsers({ httpMethods }) {
    const { id } = await httpMethods.pathParam;
    const data = await userscontroller.getUsers({ id });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(data)
      }
    };
  }

  async function postUsers({ httpMethods }) {
    const userInfo = httpMethods.data;
    const validuserInfo = validateUserInfo({ userInfo });
    const password = validuserInfo.password;
    const Hashedpassword = await passwordHasher({ password });
    validuserInfo.password = Hashedpassword;
    validuserInfo.token = await genToken();
    const registereduser = await userscontroller.addUsers({
      validuserInfo,
      imagePath: userInfo.imagePath
    });
    if (!registereduser) throw "Error registering user";
    const { token, email, username } = registereduser;
    await sendMail({
      token,
      ...registereduser,
      subject: "Activate your account in Employee Management System"
    });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(registereduser)
      }
    };
  }

  async function putUsers({ httpMethods }) {
    const { id } = httpMethods.pathQuery;
    console.log(id);

    if (!id)
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Cannot locate user!Invalid query params"
      });
    const userInfo = httpMethods.data;
    const { address, contact, dob, age } = userInfo;
    const validuserInfo = validateUserInfo({ userInfo });
    const updateduser = await userscontroller.updateUsers({
      id,
      address,
      dob,
      contact,
      age,
      ...validuserInfo
    });
    return {
      header: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(updateduser)
      }
    };
  }

  async function deleteUsers({ httpMethods }) {
    const { id } = httpMethods.pathQuery;
    if (!id)
      return makeHttpError({
        statusCode: 400,
        errorMessage: "Cannot locate user!Invalid query params"
      });
    const deletedUsers = await userscontroller.removeUsers({ id });
    return {
      header: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(deletedUsers)
      }
    };
  }
}
