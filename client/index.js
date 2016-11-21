var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();

jsx.install();

var url = 'http://localhost:51918'; 
var Books = require('./views/components/Book.jsx');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/bundle.js', function(req, res) {
    res.setHeader('content-type', 'application/javascript');
    browserify('./app.js', {
        debug: true
    })
    .transform('reactify')
    .bundle()
    .pipe(res);
});

app.post('/api/books', function(req, res) {
    request.post({
            url:url + '/api/books',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(req.body)
        }, function (err, httpResponse, body) { 
            if (!err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.use('/', function(req, res) {

    request(url + '/api/books', function (error, response, body) {
        
        if (!error && response.statusCode == 200) {
            var books = JSON.parse(body);
        }
    });
});


var server = app.listen(3333, function() {
    var addr = server.address();
    console.log('Listening @ http://%s:%d', addr.address, addr.port);
});
