import jwt from "jsonwebtoken";

export default function jsonwebtokenHandler({
  _id,
  email,
  role,
  username,
  imagePath
}) {
  console.log(imagePath);

  const token = jwt.sign(
    {
      id: _id,
      email: email,
      username: username,
      role: role,
      imagePath: imagePath
    },
    process.env.SECRET_KEY
  );
  return token;
}
