import makeHttpError from "../../../globalHelpers/http-error";
import { encrypter, decrypter } from "../../userhelper/encrypter-decrypter";
import { genToken } from "../../../globalHelpers/bcrypter.helper";
import emailChecker from "../helper/emailchecker";
import sendMail from "../../../globalHelpers/mailsender";
export default function loginEndpointHandler({ logincontroller }) {
  return async function({ httpMethods }) {
    switch (httpMethods.method) {
      case "POST":
        return postforLogin({ httpMethods });
      case "PATCH":
        return patchforResetPassword({ httpMethods });
      case "PUT":
        return putforsendlinktomail({ httpMethods });
    }
  };
  async function postforLogin({ httpMethods }) {
    const { email, password } = httpMethods.data;
    const isValidEmail = emailChecker({ email });
    if (!isValidEmail)
      return makeHttpError({ statusCode: 401, errorMessage: "Email Invalid" });
    return await logincontroller.loginUser({ email, password });
  }

  async function patchforResetPassword({ httpMethods }) {
    const { token } = httpMethods.pathParam;
    const { password, email } = httpMethods.data;
    console.log(token + email);
    console.log("new");
    const decryptedEmail = await decrypter(email);
    return await logincontroller.resetPassword({
      token,
      decryptedEmail,
      password
    });
  }
  async function putforsendlinktomail({ httpMethods }) {
    const { email } = httpMethods.data;
    const isValidEmail = emailChecker({ email });
    if (!isValidEmail)
      return makeHttpError({ statusCode: 401, errorMessage: "Email Invalid" });
    const token = await genToken();
    const username = await logincontroller.sendlinktomail({ email, token });
    await sendMail({
      email,
      token,
      username,
      subject: "Reseting password for Employee Management System"
    });
    return {
      headers: {
        "Content-Type": "application/json"
      },
      statusCode: 200,
      data: {
        success: true,
        content: JSON.stringify("Mail sent Successfully")
      }
    };
  }
}
