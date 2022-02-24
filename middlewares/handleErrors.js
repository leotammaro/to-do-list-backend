const handleError = (err, req, res, next) => {
  if (err.name == "CastError") res.sendStatus(400);
  else {
    res.sendStatus(500);
  }
};

module.exports = handleError;
