const { VALIDATION_ERROR, UNAUTHORIZED, NOT_FOUND, FORBIDDEN, INVALID_TOKEN, SEVER_ERROR } = require("../statusCodes");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
      case VALIDATION_ERROR:
        res.json({
          title: "Validation failed",
          message: err.message,
          stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
        });
        break;
      case UNAUTHORIZED:
        res.json({
          title: "Unauthorized",
          message: err.message,
          stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
        });
        break;
      case NOT_FOUND:
        res.json({
          title: "Not found",
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
      case INVALID_TOKEN:
        res.json({
          title: "Token has expired or is invalid",
          message: err.message,
          stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
        });
        break;
      case SEVER_ERROR:
        res.json({
          title: "Sever Error",
          message: err.message,
          stackTrace: process.env.ENVIROMENT === 'development' ? err.stack : {}
        });
        break;
      default:
        console.log("No error, All good");
        break;
    }
}



module.exports = errorHandler;