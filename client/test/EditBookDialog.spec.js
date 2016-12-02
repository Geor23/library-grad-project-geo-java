var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var EditBookDialog = require('../views/components/EditBookDialog.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<EditBookDialog />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getBooks;
	 before(function() {
		d = Date.now().toString();
        getBooks=function(){console.log('hello')};
        wrapper = shallow(
            <EditBookDialog 
                id={0} 
                title={'title'}
                author={'author'}
                isbn={'isbn'}
                date={d}
                getBooks={getBooks}
            />, {
                context: {muiTheme},
                childContextTypes: {muiTheme: React.PropTypes.object}
        });
    });
  	it('should have the props set', function () {
        expect(wrapper.instance().props.id).to.equal(0);
    	expect(wrapper.instance().props.title).to.equal('title');
    	expect(wrapper.instance().props.author).to.equal('author');
    	expect(wrapper.instance().props.isbn).to.equal('isbn');
    	expect(wrapper.instance().props.date).to.equal(d);
    	expect(wrapper.instance().props.getBooks).to.equal(getBooks);
  	});
  	it('should have 3 TextField children [title, author, isbn]', function () {
    	expect(wrapper.find('TextField').length).to.equal(3);
        expect(wrapper.find('TextField').at(0).props().id).to.equal('title');
        expect(wrapper.find('TextField').at(1).props().id).to.equal('author');
        expect(wrapper.find('TextField').at(2).props().id).to.equal('isbn');
  	});
    it('should have 1 DatePicker child', function () {
    	expect(wrapper.find('DatePicker').length).to.equal(1);
  	});
    it('input fields should have initial values set to the book values', function () {
        expect(wrapper.find('TextField').at(0).props().value).to.equal('title');
        expect(wrapper.find('TextField').at(1).props().value).to.equal('author');
        expect(wrapper.find('TextField').at(2).props().value).to.equal('isbn');
  	});
    it('change of state should update input fields', function () {
        wrapper.setState({title: 't', author: 'a', isbn: 'i'});
        expect(wrapper.find('TextField').at(0).props().value).to.equal('t');
        expect(wrapper.find('TextField').at(1).props().value).to.equal('a');
        expect(wrapper.find('TextField').at(2).props().value).to.equal('i');
  	});
    it('should have 2 actions, cancel and submit', function () {
		expect(wrapper.node.props.actions).to.have.length(2);
		expect(wrapper.node.props.actions[0].props.label).to.equal('CANCEL');
		expect(wrapper.node.props.actions[1].props.label).to.equal('SUBMIT');
  	});
  	it('should set the state open: true when startDialog gets fired', function () {
    	wrapper.instance().startDialog();
		expect(wrapper.state().open).to.equal(true);
  	});
	it('pressing CANCEL should close the dialog', function () {
		wrapper.node.props.actions[0].props.onTouchTap();
    	expect(wrapper.state().open).to.equal(false);
  	});
});