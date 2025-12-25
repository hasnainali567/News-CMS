export const globalErrorHandler = (err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went wrong!';
  const errorStack = err.stack || '';
  
  console.error(err);
  res.status(errorStatus).send({
    success: false,
    message: errorMessage,
    error: err.errors || [],
  });
};