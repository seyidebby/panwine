const mongoose = require("mongoose");
const signup = require("../models/signup.model.js");
const bcrypt = require("bcryptjs");
const { generateToken, decodeToken } = require("../utils/index.js");
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
module.exports = {
  login,
};
