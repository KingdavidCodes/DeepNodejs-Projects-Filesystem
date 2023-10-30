const { VALIDATION_ERROR, NOT_FOUND, UNATUHORIZED, FORBIDDEN, SERVER_ERROR } = require("../constants");


// * @routes custom error Handlers
const errorHandler = (err, req, res, next) => {
  // //! if there is no res.status() set we use 500 
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message,
        stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
      });
      break;
    case NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
      });
      break;
    case UNATUHORIZED:
      res.json({
        title: "Unauthorized",
        message: err.message,
        stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
      });
      break;
    case SERVER_ERROR:
      res.json({
        title: "Sever Error",
        message: err.message,
        stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
      });
      break;
  
    default:
      console.log("No Error, All good !")
      break;
  }
}

module.exports = errorHandler;