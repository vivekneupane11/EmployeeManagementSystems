import bcrypt from "bcrypt";

export function passwordHasher({ password }) {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  return hashedPassword;
}

export function passwordMatcher({ password, hashedPassword }) {
  const istrue = bcrypt.compareSync(password, hashedPassword);
  return istrue;
}

export function genToken() {
  let token = bcrypt.genSaltSync(24);
  return token.replace(/[^A-Za-z0-9]/g, "");
}
