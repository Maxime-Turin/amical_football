// Error Handler
module.exports = class ApiError extends Error {
  constructor(message, infos) {
    // send the message to the class Error
    super(message);
    // set the name to ApiError
    this.name = 'ApiError';
    // set additionnal infomations as infos
    this.infos = infos;
  }
};
