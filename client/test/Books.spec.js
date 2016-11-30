var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var Book = require('../views/components/Book.jsx') ;
var Books = require('../views/components/Books.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<Book />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getBooks;
	 before(function() {
        d = Date.now().toString();
        getBooks=function(){console.log('hello')};
        wrapper = shallow(
            <Books 
                books={[]}
                getBooks={getBooks}
            />, {
                context: {muiTheme},
                childContextTypes: {muiTheme: React.PropTypes.object}
        });
    });
    it('should have the props set', function () {
        expect(wrapper.instance().props.books).to.deep.equal([]);
    });
  	it('should have 1 child', function () {
    	expect(wrapper.children().length).to.equal(1);
  	});
    it('setting the state of books to contain 1 book should make div have 1 book child', function () {
    	wrapper.setState({books: [{Id:0, Title:'title', Author: 'author', ISBN: 'isbn', PublishDate: d}]});
        expect(wrapper.childAt(0).children().length).to.equal(1);
        expect(wrapper.childAt(0).childAt(0).type().displayName).to.equal('Book');
  	});
});