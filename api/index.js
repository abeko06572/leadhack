const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

/*app.get('/', function (req, res) {
    res.json({
        message: "Hello World!"
    });
});

app.get('/api/get',function (req, res) {
    res.json({
        message: "Hello World!2"
    });
});*/

app.post('/',function (req, res) {
    const data = req.body;
    console.log('req.body',data['events'][0]['message']['id']);
    res.send('api:OK');
});

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT); 
