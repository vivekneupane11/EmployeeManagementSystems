import makehttpError from "../../globalHelpers/http-error";
export default function validateUserInfo({ userInfo }) {
  const { username, email, password, department, role } = userInfo;
  if (!username || !email || !password || !department || !role) {
    throw "Data missing in request body";
  }
  let regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const validemail = regex.test(email);
  if (!validemail) {
    throw "Email address not valid";
  }
  return {
    username,
    email,
    password,
    department,
    role
  };
}
