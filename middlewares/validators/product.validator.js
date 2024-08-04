const joi = require("joi");
const productSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
});
function validateProduct(req, res, next) {
  const { error, value } = productSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

const productEditSchema = joi.object({
  name: joi.string(),
  price: joi.number(),
});
function validateEditProduct(req, res, next) {
  const { error, value } = productEditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

module.exports = { validateProduct, validateEditProduct };
