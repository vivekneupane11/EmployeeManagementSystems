const nodemailer = require("nodemailer");
const crypto = require("crypto"),
  algorithm = "aes-256-ctr",
  password = "d6F3Efeq";

//Sending mail to valid users
module.exports = async function(user, token) {
  let transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.PASSWORD
    }
  });

  function encrypt(text) {
    let cipher = crypto.createCipher(algorithm, password);
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  let mailOptions = {
    from: process.env.EMAIL_TRANSPORT,
    to: user.email,
    subject: "RESETING PASSORD IN EMPLOYEE MANAGEMENT SYSTEM",
    html: `<h2> !!HELLO ${user.name} </h2>
        <h4> Go through link below to reset password</h4>
        <a href=http://localhost:3000/reset/${token}/${encrypt(
      user.email
    )}>CLICK ME </a>
        <p> You have received this email because you or someone elsee has tried to reset
        their password using this mail in Employee Management System</p>
`
  };

  await transporter.sendMail(mailOptions);
};
