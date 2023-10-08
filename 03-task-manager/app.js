const express = require('express');
const app = express();
const taskRoutes = require('./routes/task')
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handling');

// * MIDDLEWARES
app.use(express.static('./public'))
app.use(express.json());
// app.use(express.urlencoded({extended: true}));

// * ROUTES
app.use('/api/v1/tasks', taskRoutes);


// * Middleware for unknown routes
// !Cant use the middleware above our main route or else all our route won't work
app.use(notFound);
app.use(errorHandlerMiddleware);





const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log(`Connected to DB`);
        app.listen(port, () => {
           console.log(`server is listing on ${port}...`); 
        });
    } catch (error) {
        console.log(error);
    }
}

start();


