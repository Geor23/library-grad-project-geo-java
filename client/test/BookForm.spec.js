var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var BookForm = require('../views/components/BookForm.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<BookForm />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, onBook;
	 before(function() {
        d = Date.now().toString();
        onBook=function(){console.log('hello')};
        wrapper = shallow(
            <BookForm 
                onBook={onBook}
            />, {
                context: {muiTheme},
                childContextTypes: {muiTheme: React.PropTypes.object}
        });
    });
    it('should have the props set', function () {
        expect(wrapper.instance().props.onBook).to.equal(onBook);
    });
  	it('should have 3 TextField children [title, author, isbn]', function () {
    	expect(wrapper.find('TextField').length).to.equal(3);
        expect(wrapper.find('TextField').at(0).props().id).to.equal('title');
        expect(wrapper.find('TextField').at(1).props().id).to.equal('author');
        expect(wrapper.find('TextField').at(2).props().id).to.equal('isbn');
        console.log(wrapper.find('TextField').at(0).props());
  	});
    it('should have 1 DatePicker child', function () {
    	expect(wrapper.find('DatePicker').length).to.equal(1);
  	});
    it('input fields should have initial values empty string', function () {
        expect(wrapper.find('TextField').at(0).props().value).to.equal('');
        expect(wrapper.find('TextField').at(1).props().value).to.equal('');
        expect(wrapper.find('TextField').at(2).props().value).to.equal('');
  	});
    it('change of state should update input fields', function () {
        wrapper.setState({title: 't', author: 'a', isbn: 'i'});
        expect(wrapper.find('TextField').at(0).props().value).to.equal('t');
        expect(wrapper.find('TextField').at(1).props().value).to.equal('a');
        expect(wrapper.find('TextField').at(2).props().value).to.equal('i');
  	});
    it('should have 1 RaisedButton child as submit', function () {
    	expect(wrapper.find('RaisedButton').length).to.equal(1);
    	expect(wrapper.find('RaisedButton').props().type).to.equal('submit');        
  	});
});