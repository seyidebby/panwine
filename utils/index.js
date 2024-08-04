const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

function generateToken(data) {
  const secret = process.env.JWT_SECRET;
  const token = jwt.sign(data, secret);
  return token;
}

function decodeToken(token) {
  const secret = process.env.JWT_SECRET;
  const decodedToken = jwt.decode(token, secret);
  return decodedToken;
}
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "oluwaseyiogunsola16@gmail.com",
    pass: "apwlxontphrqolse",
  },
});
const SENDMAIL = async (mailDetails, callback) => {
  try {
    const info = await transporter.sendMail(mailDetails);
    callback(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  generateToken,
  decodeToken,
  SENDMAIL,
};
