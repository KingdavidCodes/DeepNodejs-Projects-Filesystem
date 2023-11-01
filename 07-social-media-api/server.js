const http = require('http');
const express = require('express');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorsHandler');
require('dotenv').config();


const port = process.env.PORT || 5000;
const app = express();




// * Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api/posts', require('./routes/postRoutes'));

// * Error handler & Unknown route handler 
app.use(errorHandler);
app.use(notFound);

http.createServer(app).listen(port, () => {
  console.log(`server running on port: ${port}`);
});


