module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (!err.isOperational) err.message = "Something Wend Wrong!";
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
