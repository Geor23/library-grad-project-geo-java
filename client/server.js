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

var url = 'http://localhost:8080'; 

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

/*
    ----------------------------------------------
    ---------------BOOKS--------------------------
    ----------------------------------------------
*/

app.get('/api/books', function(req, res) {
    request(url + '/books', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.setHeader('Content-Type', 'application/json');
            res.send(body);
        }
    });
});

app.post('/api/books', function(req, res) {
    var book = {
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        publishDate: getDateString(req.body.date)
    };
    request.post({
            url:url + '/books',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(book)
        }, function (err, httpResponse, body) { 
            if (err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.delete('/api/books/', function(req, res) {
    request.delete({
            url:url + '/books',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(req.body.id)
        }, function (err, httpResponse, body) { 
            if (err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.put('/api/books', function(req, res) {
    var book = {
        bookId: req.body.id,
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        publishDate: getDateString(req.body.date)
    };
    request.put({
            url:url + '/books',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(book)
        }, function (err, httpResponse, body) { 
            if (err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

/*
    ----------------------------------------------
    ---------------BOOK RESERVATIONS--------------
    ----------------------------------------------
*/

app.get('/api/bookreservations/:id', function(req, res) {
    request(url + '/bookreservations', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var reservations = JSON.parse(body);
            var filterByID = function(obj) {
                if (obj.book == req.params.id) {
                    return true;
                } else {
                    return false;
                }
            }
            var arrByID = reservations.filter(filterByID);
            res.setHeader('Content-Type', 'application/json');
            res.send(arrByID);
        }
    });
});

app.post('/api/bookreservations', function(req, res) {
    var data = {
        book: req.body['book[id]'],
        from: getDateString(req.body.from),
        to: getDateString(req.body.to)
    };
    request.post({
            url:url + '/bookreservations',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }, function (err, httpResponse, body) { 
            if (err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.delete('/api/bookreservations/', function(req, res) {
    request.delete({
            url:url + '/bookreservations',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(req.body.id)
        }, function (err, httpResponse, body) { 
            if (err) {
                console.log("err: " + err);
            }
    });
    res.sendStatus(200);
});

app.put('/api/bookreservations', function(req, res) {
    var data = {
        id: req.body.id,
        book: req.body.book,
        from: getDateString(req.body.from),
        to: getDateString(req.body.to)
    };
    request.put({
            url:url + '/bookreservations',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }, function (err, httpResponse, body) { 
            if (err) {
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

var getDateString = function(data) {
    var date = new Date(data);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return year + "-" + month + "-" + day; 
};

module.exports = server
