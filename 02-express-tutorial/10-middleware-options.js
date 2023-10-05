const express = require('express');
const app = express();
const morgan = require('morgan');
const port  = 5000;
const logger = require('./logger');
const authorize = require('./authorize');

// req => middleware => res
// app.use([logger, authorize]); // ! Other way to execute multiple middleware function in app.use()

// app.use(logger);
// app.use('/about', authorize);

// app.use(express.static('./public'));

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Home')
    console.log(req.user); // can't access the authorize middleware in our route since it doesn't have access to the middleware
});

app.get('/about', (req, res) => {
    res.send('About') // we have access to our middleware 
    console.log(req.user);
});

// 
app.get('/api/items', [logger, authorize], (req, res) => {
    res.send('items')
    console.log(req.user);
});

app.get('/api/products', (req, res) => {
    res.send('products')
});


app.listen(port, () => {
    console.log(`Server is listening on port 5000.....`);
});



// Middleware are functions  that execute during the request to the server. Each middleware have access to the (request) and (response) object.
