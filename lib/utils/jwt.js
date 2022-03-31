// import web token
const jwt = require('jsonwebtoken');


const signWebToken = (user) => {
  return jwt.sign({ ...user }, process.env.JWT_SECRET, {
    expiresIn: '1 day',
  });
};


const verifyWebToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  signWebToken,
  verifyWebToken
};

