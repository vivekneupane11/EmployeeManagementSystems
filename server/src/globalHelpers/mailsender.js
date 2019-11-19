import nodemailer from 'nodemailer';
import { genToken } from '../globalHelpers/bcrypter.helper';
import { encrypter, decrypter } from '../users/userhelper/encrypter-decrypter';
export default async function sendMail({ email, token, username, subject }) {

    const encryptedEmail = await encrypter(email);
    let transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "empolyoeemgmt1@gmail.com",
            pass: "display:flex;"
        }
    });
    let mailOptions = {
        from: "empolyoeemgmt1@gmail.com",
        to: email,
        subject: subject,
        html: `<h3>Welcome ${username}</h3>
            <h5> Go through the link below to reset password</h5>
            <a href=http://localhost:3000/reset/${token}/${encryptedEmail}>Click me to reset password </a>
              <span> You have received this email because you or someone elsee has tried to access account using this mail in Employee Management System</span>`
    };

    return (await transporter.sendMail(mailOptions));
}