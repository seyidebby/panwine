const joi = require("joi");

const signupSchema = joi.object({
  fullName: joi.string().required(),
  phoneNumber: joi.number().required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(10).required(),
});

function validateSignup(req, res, next) {
  const { error, value } = signupSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}
const accountEditSchema = joi.object({
  fullName: joi.string(),
  phoneNumber: joi.number(),
  email: joi.string().email(),
  password: joi.string().min(8).max(10),
});
function validateEditAccount(req, res, next) {
  const { error, value } = accountEditSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

const loginSchema = joi.object({
  password: joi.string().required(),
  email: joi.string().email().required(),
});

function validatelogin(req, res, next) {
  const { error, value } = loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

module.exports = {
  validateSignup,
  validateEditAccount,
  validatelogin,
};
