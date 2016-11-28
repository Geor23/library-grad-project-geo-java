var assert = require('assert');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();


var server = require('../server.js');


chai.use(chaiHttp);

describe('Server', function() {
	var count, lastId, lastIdR;
	var d = new Date();
	var newD = d.setDate(28);
	var book = {
		title: 'title',
        author: 'author',
        isbn: 'isbn',
        date: d
	};
	var newBook = {
		title: 'newtitle',
        author: 'author',
        isbn: 'isbn',
        date: d
	};
	var bookReserv = {
        from: d.setDate(1),
        to: d.setDate(20)
    };
    var newBookReserv = {
        from: d.setDate(1),
        to: newD
    };
  	describe('GET /api/books', function() {
    	it('should return an array', function(done) {
      		chai.request(server)
            .get('/api/books')
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                count = res.body.length;
                done();
            });
    	});
  	});

  	describe('POST /api/books', function() {
    	it('should add a book', function(done) {
    		chai.request(server)
            .post('/api/books')
            .send(book)
            .end( function(err, res) {
            	setTimeout(function(){
		            res.should.have.status(200);
		            done();
	            },200);
	        });
    	});
    	it('the new books array should have 1 extra item now', function(done) {
    		chai.request(server)
            .get('/api/books')
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                lastId = res.body[res.body.length-1].Id;
                newBook.id = lastId;
                bookReserv['book[id]'] = lastId;
                newBookReserv.bookId = lastId;
                assert.equal(count+1, res.body.length);
                done();
            });
    	});
  	});

  	describe('PUT /api/books', function() {
    	it('should edit a book', function(done) {
    		chai.request(server)
            .put('/api/books')
            .send(newBook)
            .end( function(err, res) {
	            setTimeout(function(){
		            res.should.have.status(200);
		            done();
	            },200);
	        });
    	});
    	it('the editted book should have the new title', function(done) {
    		chai.request(server)
            .get('/api/books')
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                assert.equal(count+1, res.body.length);
                assert.equal('newtitle', res.body[res.body.length-1].Title);
                done();
            });
    	});
  	});

  	describe('GET /api/bookreservations', function() {
    	it('should return an array', function(done) {
      		chai.request(server)
            .get('/api/bookreservations/' + lastId)
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                assert.equal(0, res.body.length);
                done();
            });
    	});
  	});

  	describe('POST /api/bookreservations', function() {
    	it('should add a book reservation', function(done) {
    		chai.request(server)
            .post('/api/bookreservations')
            .send(bookReserv)
            .end( function(err, res) {
            	setTimeout(function(){
		            res.should.have.status(200);
		            done();
	            },200);
	        });
    	});
    	it('the new bookreservations array should have 1 extra item now', function(done) {
    		chai.request(server)
            .get('/api/bookreservations/' + lastId)
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                lastIdR = res.body[res.body.length-1].Id;
                newBookReserv.id = lastIdR;
                assert.equal(1, res.body.length);
                done();
            });
    	});
  	});

  	describe('PUT /api/bookreservations', function() {
    	it('should edit a book reservation', function(done) {
    		chai.request(server)
            .put('/api/bookreservations')
            .send(newBookReserv)
            .end( function(err, res) {
	            setTimeout(function(){
		            res.should.have.status(200);
		            done();
	            },200);
	        });
    	});
    	it('the editted book reservation should have the new to date', function(done) {
    		chai.request(server)
            .get('/api/bookreservations/' + lastId)
            .end( function(err, res) {
                res.should.have.status(200);
                assert.equal(1, res.body.length);
                var date = new Date(res.body[res.body.length-1].to);
                assert.equal(28, date.getDate());
                done();
            });
    	});
  	});

  	describe('DELETE /api/bookreservations', function() {
    	it('should delete a book reservation', function(done) {
    		chai.request(server)
            .delete('/api/bookreservations/')
            .send({id: lastIdR})
            .end( function(err, res) {
            	setTimeout(function(){
		            res.should.have.status(200);
		            done();
	            },200);
	        });
    	});
    	it('the bookreservations array should have 1 less item', function(done) {
    		chai.request(server)
            .get('/api/bookreservations/' + lastId)
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                assert.equal(0, res.body.length);
                done();
            });
    	});
  	});


  	describe('DELETE /api/books', function() {
    	it('should delete a book', function(done) {
    		chai.request(server)
            .delete('/api/books/')
            .send({id: lastId})
            .end( function(err, res) {
            	setTimeout(function(){
		            res.should.have.status(200);
		            done();
	            },200);
	        });
    	});
    	it('the books array should have 1 less item', function(done) {
    		chai.request(server)
            .get('/api/books')
            .end( function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                assert.equal(count, res.body.length);
                done();
            });
    	});
  	});
});