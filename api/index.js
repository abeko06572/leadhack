const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
    res.json({
        message: "Hello World!"
    });
});

app.get('/api/get',function (req, res) {
    res.json({
        message: "Hello World!2"
    });
});

app.post('/api/post',function (req, res) {
    res.json({
        message: "Hello World!3"
    });
    console.log(req.body);
});

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT); 
