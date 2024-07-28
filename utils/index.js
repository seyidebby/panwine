const jwt = require("jsonwebtoken");

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

module.exports = {
  generateToken,
  decodeToken,
};
