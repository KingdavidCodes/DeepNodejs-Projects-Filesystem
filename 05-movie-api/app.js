const http = require('http');
const express = require('express');
require('express-async-errors');
const app = express();
require('dotenv').config();
const port = process.env.port || 5000;

const connectionDB = require('./db/connect');
const  moviesRouter = require('./routes/movies');
const ErrorHandler = require('./middleware/error-handling');
const NotFound = require('./middleware/not-found');
const Movies = require('./models/movies');
const moviesJSON = require('./static_data.json');

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));



// Middleware(Routes)
app.use('/api/v1/movies/', moviesRouter);

// error handling
app.use(ErrorHandler);
app.use(NotFound);





async function serverConnection() {
    try {
        await connectionDB(process.env.MONGO_CONNECT);
        await Movies.deleteMany();
        await Movies.create(moviesJSON);
        console.log('DB POPULATED WITH MOVIES DATA...');
        http.createServer(app).listen(port, () => console.log(`SEVER RUNNING ON ${port}`));
    } catch (error) {
        console.log(error);
    }
}

serverConnection();