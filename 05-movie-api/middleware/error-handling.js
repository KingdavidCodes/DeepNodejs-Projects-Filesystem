const ErrorHandler = (err, req, res, next) => {
    console.log(err);
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';


    // JSON ERROR CODE
    res.status(errStatus).json({
        sucess: false,
        status: errStatus,
        message: errMsg,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
}



module.exports = ErrorHandler;


// const ErrorHandler = (err, req, res, next) => {
//     console.log("Middleware Error Hadnling");
//     const errStatus = err.statusCode || 500;
//     const errMsg = err.message || 'Something went wrong';
//     res.status(errStatus).json({
//         success: false,
//         status: errStatus,
//         message: errMsg,
//         stack: process.env.NODE_ENV === 'development' ? err.stack : {}
//     })
// }

// export default ErrorHandler