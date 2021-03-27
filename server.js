const express = require('express');
const dbConfig = require('./config/development.config.js');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connecting to database
MongoClient.connect(dbConfig.url, { useUnifiedTopology: true }, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to database!");
}).catch(err => {
    console.log("Could not connect to the database. Existing now...", err);
    process.exit();
})

// create express app
const app = express();

// define a simple route
app.get('/', (req, res) => {
    res.send('Welcome home!')
});

// Require Blogs routes
require('./app/routes/blog.routes.js')(app);

// Listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000!');
})