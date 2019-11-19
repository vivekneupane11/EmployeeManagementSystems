import makeHttpError from "../../../globalHelpers/http-error";
import {
  passwordMatcher,
  passwordHasher
} from "../../../globalHelpers/bcrypter.helper";
import jsonwebtokenHandler from "../../../globalHelpers/jwt.helper";
export default function loginController({ database }) {
  return Object.freeze({
    loginUser,
    resetPassword,
    sendlinktomail
  });

  async function loginUser({ email, password }) {
    const db = await database;
    const ifEmailExist = await db.collection("users").findOne({ email: email });
    if (!ifEmailExist) {
      return makeHttpError({
        statusCode: 404,
        errorMessage: "Email not registered"
      });
    }
    const hashedPassword = ifEmailExist.password;
    const isValidUser = await passwordMatcher({ password, hashedPassword });
    if (!isValidUser) {
      return makeHttpError({
        statusCode: 404,
        errorMessage: "Invalid Password"
      });
    }

    const token = await jsonwebtokenHandler({ ...ifEmailExist });
    ifEmailExist.token = token;
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(ifEmailExist)
      }
    };
  }

  async function resetPassword({ token, decryptedEmail, password }) {
    const db = await database;
    const nowTime = await Date.now();
    const newPassword = await passwordHasher({ password });
    const isEmailValid = await db.collection("users").findOne({
      email: decryptedEmail,
      token: token,
      tokenExpiryDate: { $gt: nowTime }
    });
    if (!isEmailValid) {
      return makeHttpError({
        statusCode: 401,
        errorMessage:
          "Invalid email/token.Try Registering! Token might have been expired"
      });
    }
    await db.collection("users").updateOne(
      { email: decryptedEmail },
      {
        $set: {
          password: newPassword,
          token: null,
          tokenExpiryDate: await Date.now()
        }
      }
    );
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify(isEmailValid)
      }
    };
  }
  async function sendlinktomail({ email, token }) {
    const db = await database;
    const ifEmailExist = await db.collection("users").findOne({ email: email });
    if (!ifEmailExist) {
      throw "Email doesnot Exist";
    }
    let date = Date.now() + 3600 * 1000 * 24;
    await db.collection("users").updateOne(
      { email: email },
      {
        $set: {
          token: token,
          tokenExpiryDate: date
        }
      }
    );
    return ifEmailExist.username;
  }
}
