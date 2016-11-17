var express = require('express');
var browserify = require('browserify');
var React = require('react');
var jsx = require('node-jsx');
var request = require('request');
var app = express();

jsx.install();

var url = 'http://localhost:51918'; 


var Books = require('./views/index.jsx');

app.use('/bundle.js', function(req, res) {
  res.setHeader('content-type', 'application/javascript');
  browserify('./app.js', {
    debug: true
  })
  .transform('reactify')
  .bundle()
  .pipe(res);
});

app.use('/', function(req, res) {
  var books;
  request(url + '/api/books', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      books = body;
    }
  })
  
  res.setHeader('Content-Type', 'text/html');
  res.end(React.renderToStaticMarkup(
    React.DOM.body(
      null,
      React.DOM.div({
        id: 'container',
        dangerouslySetInnerHTML: {
          __html: React.renderToString(React.createElement(Books, {
            books: books
          }))
        }
      }),
      React.DOM.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify(books)
      }),
      React.DOM.script({
        src: '/bundle.js'
      })
    )
  ));
});



var server = app.listen(8080, function() {
  var addr = server.address();
  console.log('Listening @ http://%s:%d', addr.address, addr.port);
});