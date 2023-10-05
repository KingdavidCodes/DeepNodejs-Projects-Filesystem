const express = require('express');
const app = express();
const port  = 5000;

// req => middleware => res
const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    console.log(method, url, time);
    next();
}


app.get('/', logger, (req, res) => {
    res.send('Home')
});

app.get('/about', logger, (req, res) => {
    res.send('About')
});





app.listen(port, () => {
    console.log(`Server is listening on port 5000.....`);
});



// Middleware are functions  that execute during the request to the server. Each middleware have access to the (request) and (response) object.
