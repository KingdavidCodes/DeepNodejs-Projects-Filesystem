const express = require('express');
const app = express();
const port  = 5000;

// ROUTES
const people = require('./routes/people');
const auth = require('./routes/auth');

//  static assets
app.use(express.static('./methods-public'));  // Use the express middleware to use html

// ! Express middleware to parse form data
app.use(express.urlencoded({ extended: false}));  //To access the things that is coming through the req.body(Form data)

// ! Express middleware to parse JSON data
app.use(express.json());

// ----- Using the route (Api/people)
app.use('/api/people', people);

// Import Login route
app.use('/login', auth);


app.listen(port, () => {
    console.log(`Server is listening on port 5000.....`);
});