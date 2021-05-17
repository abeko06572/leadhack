const express = require('express');
const request = require('request');
const fs = require('fs');
const accessToken = '22qm4wrQj2BqONMYsLxujMVPIDh9TLkpnUamTNS11i3PBwDtv2hK0hFD+aNkN1FHddvU5bxu39vX7FSXD9XwEey9sci6OINx0cphuUV7iyRF62cudwoHy264V44VrjcFTgYTmvYuHQH7oxbAA8rvoQdB04t89/1O/w1cDnyilFU=';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
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
    res.send('api:OK');
    const data = req.body['events'][0]['message']['id'];
    console.log(data);
    

    const options = {
        uri: 'https://api-data.line.me/v2/bot/message/'+req.body.events[0].message.id+'/content',
        method: 'get',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
        },
        encoding: null
    };
    const replyToken = req.body.events[0][`replyToken`];

    request(options, function(error, response, body){
        const buffer = new Buffer.from(body);
        console.log(buffer);
        fs.writeFileSync('./nefry.jpg',buffer,'binary');
    
        const option = {
            uri: 'https://leadhack-test.cognitiveservices.azure.com/customvision/v3.0/Prediction/6e5b8315-4993-47cc-921f-2853e7029536/classify/iterations/abeko/image',
            method: 'post',
            headers: {
                'Content-type': 'application/octet-stream',
                'Prediction-Key': '1f0cd8f7237b4d598420ff1ab62ba8cc'
            },
            body: buffer
        }
        request(option, function(error, response, body){
            console.log(body);
            
            const resBody = JSON.parse(body);

            const messageData = {
                "replyToken": replyToken,
                "messages": [
                    {
                        "type": "text",
                        "text": "Message Body (メッセージ本文)"
                    }
                ]
            }

            const optionsLine = {
                uri: 'https://api-data.line.me/v2/bot/message/reply',
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': 'Bearer '+ accessToken,
                },
                json: messageData
            }
            request(optionsLine,function(error,res,body) {});
        });
    });
});

(process.env.NOW_REGION) ? module.exports = app : app.listen(PORT); 
