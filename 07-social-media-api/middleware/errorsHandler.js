const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  if(process.env.NODE_ENV === 'development'){
    res.json({
      message: err.message,
      status: statusCode,
      stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
    })
  }
  next();
}



module.exports = errorHandler;