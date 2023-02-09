
// const express = require('express'); //default
// const cors = require('cors');
// require('process');

import express from 'express'; //set type prop of package.json to module
import cors from 'cors';
const app = express();
app.use(cors({origin: '*'}));
app.use(express.json());
// app.use(EXPRESS.urlencoded({extended: false}));
function displayMessageInfo(message){
    let tp = undefined;
    if(message.constructor.name === 'IncomingMessage')
        tp='REQUEST';
    else if(message.constructor.name === 'ServerResponse')
        tp='RESPONSE';
    console.log(
        `${tp} INFO:\n\tPROTOCOL:${message.protocol}`+
        `\n\tIP:${message.ip}`+
        `\n\tPORT:${message.port}`+
        `\n\tHOST:${message.hostname}`+
        `\n\tURL:${message.url}`+
        `\n\tORIGINAL URL:${message.originalUrl}`
        );
}
app.get('/',(request,response)=>{
    displayMessageInfo(request);
    response.setHeader('otherBody','Hello other body...');
    response.send('OKAY');
    displayMessageInfo(response);
    console.log('Response Body:'+response.get('otherBody'));
});
app.get('/array/:version',(req,res)=>{
    displayMessageInfo(req);
    if(/json/i.exec(req.params.version)){
        res.send(arrayJSON);
    }
    if(/RAW/i.exec(req.params.version)){
        res.send(arrayRaw);
    }
    if(/string/i.exec(req.params.version)){
    }
});

app.post('/arrays',(request,response)=>{
    displayMessageInfo(request);
    arrayJSON = request.body;
    response.send('The array is updated!!!');
});

process.on('SIGINT',()=>process.exit(2));
let port = process.argv[2];
if(port === undefined)
    process.exit(1);

let arrayJSON = {theArray: [1,1,2,3,5,8,13]};
let arrayRaw = arrayJSON.theArray;

app.listen(port,()=> console.log(`Server started on ${port}`));