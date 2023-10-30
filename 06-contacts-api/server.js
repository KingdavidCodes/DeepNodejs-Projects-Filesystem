// * WHEN I HAVE DATA PUT IT IN A SEPERATE PROJECT NAME CONTACR MANAGER APP
const http = require('http');
const express = require('express');
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConnection');

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// * MIDDILEWARE
app.use(express.json());
app.use('/api/contacts', require('./routes/contactsRoutes'));
app.use(errorHandler); // should be under our routes so when we get an error up on the api NODE will come to the next middleware and read it


// * CREATING HTTP / EXPRESS SERVER
http.createServer(app).listen(PORT, () =>{
  console.log(`SERVER RUNNING AT PORT ${PORT}`)
});

