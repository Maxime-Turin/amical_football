const middlewareFactory = (dataType, schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req[dataType]);
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = middlewareFactory;
