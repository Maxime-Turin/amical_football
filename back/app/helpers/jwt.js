const jwt = require('jsonwebtoken');

module.exports = {

  // generate a token for an user
  generateAccessToken(id) {
    return jwt.sign(id, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRES}s` });
  },

};
