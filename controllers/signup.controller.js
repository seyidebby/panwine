const mongoose = require("mongoose");
const signup = require("../models/signup.model.js");
const bcrypt = require("bcryptjs");

async function newAccount(req, res) {
  try {
    const alreadyHaveAnAccount = await signup.findOne({
      email: req.body.email,
    });
    if (alreadyHaveAnAccount) {
      return res
        .status(400)
        .json({ message: "you already have an account, login instead" });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    req.body.password = passwordHash;

    const createAccount = await signup.create(req.body);
    await createAccount.save();
    res
      .status(201)
      .json({ message: "account created successfully", new: createAccount });
  } catch (error) {
    console.log(error);
  }
}
async function getAccount(req, res) {
  try {
    const getById = await signup.findById(req.params.id);
    res.status(200).json({ message: "account gotten", product: getById });
  } catch (error) {
    console.log(error);
  }
}
async function getAllAccount(req, res) {
  try {
    const allAccount = await signup.find({});
    res
      .status(200)
      .json({ message: "all account gotten", product: allAccount });
  } catch (error) {
    console.log(error);
  }
}
async function editAccount(req, res) {
  try {
    const edit = await signup.findByIdAndUpdate(req.params.id, req.body, {
      return: "after",
    });
    res.status(200).json({ message: "account updated", product: edit });
  } catch (error) {
    console.log(error);
  }
}
async function deleteAccount(req, res) {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(207).json({ message: "account deleted" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  newAccount,
  getAccount,
  getAllAccount,
  editAccount,
  deleteAccount,
};
