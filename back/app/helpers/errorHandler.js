// eslint-disable-next-line no-unused-vars
module.exports = (err, _, res, next) => {
  let message;
  let statusCode;

  if (err.name === 'ApiError') {
    statusCode = err.infos?.statusCode ?? 400;
    message = err.message;
    console.log(err.infos);
  // BDD duplicate error
  } else if (err.name === 'ValidationError') {
    message = err.details[0].message;
    statusCode = 400;
  } else if (err.code === '23505') {
    console.log(err.infos);
    statusCode = 400;
    message = `${err.constraint.replace('_description_key', '')} already exists`;
  } else {
    statusCode = 500;
    message = 'Internal server error';
    console.log(err);
  }
  if (statusCode === 401 || statusCode === 403) {
    res.status(statusCode).json({ message, doug: false });
  } else {
    res.status(statusCode).json({ message });
  }
};
