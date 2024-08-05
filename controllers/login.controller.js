const mongoose = require("mongoose");
const signup = require("../models/signup.model.js");
const bcrypt = require("bcryptjs");
const { generateToken, decodeToken, SENDMAIL } = require("../utils/index.js");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const alreadyHaveAnAccount = await signup.findOne({
      email: req.body.email,
    });
    if (!alreadyHaveAnAccount) {
      return res
        .status(400)
        .json({ message: "user does not exist. create an account" });
    }
    const comparePassword = bcrypt.compareSync(
      req.body.password,
      alreadyHaveAnAccount.password
    );

    if (comparePassword) {
      const token = generateToken({
        _id: alreadyHaveAnAccount._id,
        email: alreadyHaveAnAccount.email,
        fullName: alreadyHaveAnAccount.fullName,
      });

      return res.status(200).json({
        message: "login successful",
        account: token,
        decode: jwt.decode(token),
      });
    }
    return res.status(400).json({ message: "credentials incorrect" });
  } catch (error) {
    console.log(error);
  }
}
async function forgotPassword(req, res) {
  try {
    const { email, password } = req.body;
    const alreadyHaveAnAccount = await signup.findOne({
      email: req.body.email,
    });
    if (!alreadyHaveAnAccount) {
      return res
        .status(400)
        .json({ message: "user does not exist. create an account" });
    }
    if (alreadyHaveAnAccount) {
      const otp = alreadyHaveAnAccount.generateOtp();

      const options = {
        from: "testwork oluwaseyiogunsola16@gmail.com",
        to: req.body.email,
        subject: "send email in node.js with nodemailer using gmail account",
        text: `this is your token ${otp.otpCode}`,
      };
      SENDMAIL(options, (info) => {
        console.log("email sent successfully");
        console.log("MESSAGE ID: ", info.messageId);
      });
      return res
        .status(400)
        .json({ message: "an otpcode as been sent to your email" });
    }

    return res.status(400).json({ message: "something went wrong" });
  } catch (error) {
    console.log(error);
  }
}
async function verifyOtp(req, res) {
  try {
    const alreadyHaveAnAccountOtp = await signup.findOne({
      otpCode: req.body.otpCode,
    });
    if (!alreadyHaveAnAccountOtp) {
      return res.status(400).json({ message: "incorrect OTP" });
    }
    if (alreadyHaveAnAccountOtp.otpExpiresIn > Date(Date.now())) {
      const otp = alreadyHaveAnAccountOtp.verifyOtp();

      return res.status(200).json({ message: "OTP verified successfully" });
    }

    return res.status(400).json({ message: "otp expired" });
  } catch (error) {
    console.log(error);
  }
}
async function resetPassword(req, res) {
  try {
    const alreadyHaveAnAccountOtp = await signup.findOne({
      otpCode: req.body.otpCode,
    });
    if (!alreadyHaveAnAccountOtp) {
      return res.status(400).json({ message: "incorrect OTP" });
    }
    if (alreadyHaveAnAccountOtp.isOtpVerified) {
      alreadyHaveAnAccountOtp.resetPassword(req.body.password);

      return res.status(200).json({ message: "password reset succesfully" });
    }

    return res.status(400).json({ message: "otp expired or not verified" });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
};
