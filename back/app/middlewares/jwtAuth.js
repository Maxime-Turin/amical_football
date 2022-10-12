require('dotenv').config();
const jwt = require('jsonwebtoken');
const ApiError = require('../error/apiError');

module.exports = (req, res, next) => {
  // Get the authorization request header
  const authHeader = req.headers.authorization;
  // eslint-disable-next-line no-console
  console.log(req.headers);

  if (authHeader) {
    // Get the token inside the header
    const token = authHeader.split(' ')[1];

    // Verification of the token.
    // eslint-disable-next-line consistent-return
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        throw new ApiError('Authentification expiré, veuillez vous connecter.', { statusCode: 403 });
      }
      req.user = user;
      next();
    });
  } else {
    throw new ApiError('Accès interdit', { statusCode: 401 });
  }
};
