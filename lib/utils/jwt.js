// import web token

const jwt = require('jwtwebtoken');


const signWebToken = (payload) => {
  return jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiration: '1 day',
  });
};


const verifyWebToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  signWebToken,
  verifyWebToken
};

