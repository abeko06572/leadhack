const express = require('express');
const request = require('request');
const accessToken = '22qm4wrQj2BqONMYsLxujMVPIDh9TLkpnUamTNS11i3PBwDtv2hK0hFD+aNkN1FHddvU5bxu39vX7FSXD9XwEey9sci6OINx0cphuUV7iyRF62cudwoHy264V44VrjcFTgYTmvYuHQH7oxbAA8rvoQdB04t89/1O/w1cDnyilFU=';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const options = {
    uri: 'https://api.line.me/v2/bot/message/${req.body.events[0].message.id}/content',
    method: 'get',
    headers: {
        'Authorization': 'Bearer ' + accessToken,
    },
    encoding: null
};

request(options, function(error, response, body){
    const buffer = new Buffer.from(body);
    console.log(buffer);
});

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
