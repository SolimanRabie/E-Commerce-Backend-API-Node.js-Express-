const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    sendErrorForProduction(err, res);
  }
};

//********Error Handling in Development Mode Start********/
const sendErrorForDev = (err, res) => {
  res.status(err.statusCode).send({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
//********Error Handling in Development Mode End********/

//********Error Handling in Production Mode Start********/
const sendErrorForProduction = (err, res) => {
  res.status(err.statusCode).send({
    status: err.status,
    message: err.message,
  });
};
//********Error Handling in Production Mode End********/

module.exports = globalError;
