const mongoose = require("mongoose");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const signupschema = mongoose.Schema(
  {
    fullName: { type: String, require: true },
    phoneNumber: { type: Number, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    otpCode: { type: String },
    otpExpiresIn: { type: String },
    isOtpVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

signupschema.methods.generateOtp = function () {
  const otpCode = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const expires = new Date(Date.now() + 600000);

  this.otpCode = otpCode;
  this.otpExpiresIn = expires;

  this.save();
  return { otpCode };
};

signupschema.methods.verifyOtp = function () {
  this.isOtpVerified = true;
  this.save();
};

signupschema.methods.resetPassword = function (newPassword) {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(newPassword, salt);

  this.password = passwordHash;
  this.otpCode = null;
  this.otpExpiresIn = null;
  this.isOtpVerified = false;
  this.save();
};
const signup = mongoose.model("signup", signupschema);
module.exports = signup;
