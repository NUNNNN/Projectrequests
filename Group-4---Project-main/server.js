'use strict';
var express = require('express');
var path = require('path');
var https = require('https');
var http = require('http');

var PORT  = process.env.PORT || 5000;

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {id1: '6209610200', fname1: 'Thunyathorn', lname1: 'Panaim', 
    id2: '6209610226', fname2: 'Kiattisak', lname2: 'Jittrong',
    id3: '6209680757', fname3: 'Benyapa', lname3: 'Karmniyanont',
    id4: '6109610219', fname4: 'Pumiput', lname4: 'Chaichat',
    id5: '6209680872', fname5: 'Suthima', lname5: 'Paripunnapok',
    id6: '6209680039', fname6: 'Koonawat', lname6: 'Robruthom',
    id7: '6209610150', fname7: 'Peerawat', lname7: 'Yoorot'});
});

app.listen(PORT, function () {
    console.log(`Listening on ${PORT}`)
});

app.get('/api', function (req, res) {
    const queryParams = req.query;
    console.log('param[1]:' + queryParams['user']);
    res.send(queryParams);
});

app.get('/login/index', function (req, res) {
    res.render('index_invalid' , {invalid: 'Invalid login, please try again'});
});

app.get('/login/index/error', function (req, res) {
    res.render('index_block' , {block: 'You tried to log in too many times', cause: 'with the wrong account or password'});
});

app.get('/privacy', function (req, res) {
    res.render('privacy');
});

app.get('/registrar/advisor', function (req, res) {
    res.render('login_advisor');
});

app.get('/registrar/advisor/notifications', function (req, res) {
    res.render('noti');
});

app.get('/registrar/advisor/request', function (req, res) {
    res.render('request');
});

app.get('/registrar/advisor/request/stu/1', function (req, res) {
    res.render('request_stu1');
});

app.get('/registrar/advisor/request/stu/2', function (req, res) {
    res.render('request_stu2');
});





//var options = {
//    'method': 'POST',
//    'hostname': 'restapi.tu.ac.th',
//    'path': '/api/v1/auth/Ad/verify',
//    'headers': {
//        'Content-Type': 'application/json',
//        'Application-Key': 'TUa4e553b83aa271d3411a4ad88395265801fcfb074110e8b0e03962c01f2aed6ab1662db3a0e1451df7835880c6828fcf'
//    }
//};

//var req = https.request(options, function (res) {
//    var chunks = [];

//    res.on("data", function (chunk) {
//        chunks.push(chunk);
//    });

//    res.on("end", function (chunk) {
//        var body = Buffer.concat(chunks);
//        console.log(body.toString());
//    });

//    res.on("error", function (error) {
//        console.error(error);
//    });
//});


//var options = {
//    'method': 'GET',
//    'hostname': 'restapi.tu.ac.th',
//    'path': '/api/v2/std/fac/all',
//    'headers': {
//        'Content-Type': 'application/json',
//        'Application-Key': 'TUa4e553b83aa271d3411a4ad88395265801fcfb074110e8b0e03962c01f2aed6ab1662db3a0e1451df7835880c6828fcf'
//    }
//};

//var req = https.request(options, function (res) {
//    var chunks = [];

//    res.on("data", function (chunk) {
//        chunks.push(chunk);
//    });

//    res.on("end", function (chunk) {
//        var body = Buffer.concat(chunks);
//        console.log(body.toString());
//    });

//    res.on("error", function (error) {
//        console.error(error);
//    });
//});

//req.end();


const options = {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts/1/comments',
    method: 'GET',
    'headers': {
        'Content-Type': 'application/json',
    }
};

function dataCounter(inputs) {
    let counter = 0;
    for (const input of inputs) {
        if (input.postId === 1) counter += 1;
    }
    return counter;
};

const req = http.request(options, function(response) {
    response.setEncoding('utf8');
    response.on('data', chunk => {
        console.log('number of posts:' + dataCounter(chunk));
    });

    response.on('end', () => {
        console.log('end of GET request');
    });
});

req.on('error', e => {
    console.log('Problem with request:', e.message);
});
req.end();