const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const server = express();
const product = require("./models/product.model.js");
const {
  newProduct,
  getAllProduct,
  getProduct,
  editProduct,
  deleteProduct,
} = require("./controllers/product.controller.js");
const {
  validateProduct,
  validateEditProduct,
} = require("./middlewares/validators/product.validator.js");
const {
  validateSignup,
  validateEditAccount,
  validatelogin,
} = require("./middlewares/validators/signup.validator.js");
const signup = require("./models/signup.model.js");
const {
  newAccount,
  getAllAccount,
  getAccount,
  editAccount,
  deleteAccount,
} = require("./controllers/signup.controller.js");
const {
  login,
  forgotPassword,
  verifyOtp,
} = require("./controllers/login.controller.js");

server.use(express.json());
dotenv.config();
port = process.env.PORT;

server.post("/wine", validateProduct, newProduct);
server.get("/wine", getAllProduct);
server.get("/wine/:id", getProduct);
server.patch("/wine/:id", validateEditProduct, editProduct);
server.delete("/wine/:id", deleteProduct);

server.post("/signup", validateSignup, newAccount);
server.get("/signup", getAllAccount);
server.get("/signup/:id", getAccount);
server.patch("/signup/:id", validateEditAccount, editAccount);
server.delete("/signup/:id", deleteAccount);

server.post("/login", validatelogin, login);
server.post("/api/forgot-password", forgotPassword);
server.post("/api/verify-otp", verifyOtp);

server.listen(port, () => {
  console.log("panwine server loaded");
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("panwine connection established");
    })
    .catch(() => {
      throw new Error(err.message);
    });
});
