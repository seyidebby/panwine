const mongoose = require("mongoose");
const productschema = mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
});
const product = mongoose.model("product", productschema);
module.exports = product;
