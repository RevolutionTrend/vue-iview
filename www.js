const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-By', ' 3.2.1');
    next();
});

// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', function (req, res, next) {
    console.log(`req.path === ${req.path}.`);
    if (req.path.indexOf('/api/') > -1) {
        next();
    } else {
        let pathname = req.path;
        if (req.path === '/' || req.path.indexOf('.') < 0) {
            pathname = '/index.html';
        }
        console.log('dirname === ' + __dirname);
        res.sendFile(__dirname + '/dist' + pathname);
    }
});

app.get('/api/speed_info', function (req, res) {
    const speed = {
        up: Math.ceil(Math.random() * 512),
        down: Math.ceil(Math.random() * 1024)
    };
    console.log('speed_info: ' + JSON.stringify(speed));
    res.send(speed).end();
});

app.listen('8008', function () {
    console.log('runing on port 8008.')
});
