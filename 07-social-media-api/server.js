const http = require('http');
const express = require('express');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorsHandler');
const dbConnect = require('./config/dbConnection');
require('dotenv').config();

dbConnect();
const app = express();
const port = process.env.PORT || 5000;




// * Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// * Error handler & Unknown route handler 
app.use(errorHandler);
app.use(notFound);


http.createServer(app).listen(port, () => {
  console.log(`server running on port: ${port}`);
});


