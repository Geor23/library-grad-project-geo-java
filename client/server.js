var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var request = require('request');
var bodyParser = require('body-parser')
var app = express();
var path = require('path');

jsx.install();

app.use('/public', express.static(path.join(__dirname, 'public')));
app.engine('html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

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
    var book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        publishDate: getDateString(req.body.date)
    }
    request.post({
            url:url + '/api/books',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(book)
        }, function (err, httpResponse, body) { 
            if (!err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.delete('/api/books/', function(req, res) {
    request.delete({
            url:url + '/api/books/' + req.body.id,
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(req.body.id)
        }, function (err, httpResponse, body) { 
            if (!err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.get('/api/books', function(req, res) {
    request(url + '/api/books', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.setHeader('Content-Type', 'application/json');
            res.send(body);
        }
    });
});

var getDateString = function(data) {
    var date = new Date(data);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return month + "/" + day + "/" + year + " " + 0 + ':' + 0 + ':' + 0; 
};

app.post('/api/bookreservations', function(req, res) {

    var data = {
        bookId: req.body['book[id]'],
        from: getDateString(req.body.from),
        to: getDateString(req.body.to)
    };

    request.post({
            url:url + '/api/bookReservations',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }, function (err, httpResponse, body) { 
            if (!err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.use('/', function(req, res) {
    res.render('index');
});


var server = app.listen(3333, function() {
    var addr = server.address();
    console.log('Listening @ http://%s:%d', addr.address, addr.port);
});
