const express = require('express');

// create express app
const app = express();

// define a simple route
app.get('/', (req, res) => {
    res.send('Welcome home!')
});

// Listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000!');
})