const mongoose = require("mongoose");
const product = require("../models/product.model.js");

async function newProduct(req, res) {
  try {
    const alreadyAProduct = await product.findOne({ name: req.body.name });
    if (alreadyAProduct) {
      return res.status(400).json({ message: "already a product" });
    }
    const createProduct = await product.create(req.body);
    await createProduct.save();
    res
      .status(201)
      .json({
        message: "product created successfully",
        product: createProduct,
      });
  } catch (error) {
    console.log(error);
  }
}
async function getProduct(req, res) {
  try {
    const getById = await product.findById(req.params.id);
    res.status(200).json({ message: "product gotten", product: getById });
  } catch (error) {
    console.log(error);
  }
}
async function getAllProduct(req, res) {
  try {
    const allProduct = await product.find({});
    res
      .status(200)
      .json({ message: "all product gotten", products: allProduct });
  } catch (error) {
    console.log(error);
  }
}
async function editProduct(req, res) {
  try {
    const edit = await product.findByIdAndUpdate(req.params.id, req.body, {
      return: "after",
    });
    res.status(200).json({ message: "product updated", product: edit });
  } catch (error) {
    console.log(error);
  }
}
async function deleteProduct(req, res) {
  try {
    await product.findByIdAndDelete(req.params.id);
    res.status(207).json({ message: "product deleted" });
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  newProduct,
  getProduct,
  getAllProduct,
  editProduct,
  deleteProduct,
};
