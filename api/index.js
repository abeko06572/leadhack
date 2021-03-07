console.log('Hello World');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Hello World!');
});

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT); 

