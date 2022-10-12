// Commentaire
module.exports = class ValidationError extends Error {
  constructor(message, infos) {
    // send the message to the class Error
    super(message);
    // set the name to ApiError
    this.name = 'ValidationError';
    // set additionnal infomations as infos
    this.infos = infos;
  }
};
