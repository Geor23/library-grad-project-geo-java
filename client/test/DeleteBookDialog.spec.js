var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var DeleteBookDialog = require('../views/components/DeleteBookDialog.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<DeleteBookDialog />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getBooks;
	before(function() {
		d = Date.now().toString();
        getBooks=function(){console.log('hello')};
  		wrapper = shallow(
            <DeleteBookDialog 
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
  	it('should have initial state set to open: false', function () {
    	expect(wrapper.state().open).to.equal(false);
  	});
  	it('should have 1 child', function () {
    	expect(wrapper.children().length).to.equal(1);
  	});
  	it('should have 3 paragraphs corresponding to the book reservation data', function () {
    	expect(wrapper.find('div').children()).to.have.length(4);
    	expect(wrapper.childAt(0).childAt(0).html()).to.equal('<p>0: title</p>');
        expect(wrapper.childAt(0).childAt(1).html()).to.equal('<p>author</p>');
        expect(wrapper.childAt(0).childAt(2).html()).to.equal('<p>isbn</p>');
        expect(wrapper.childAt(0).childAt(3).html()).to.equal('<p>' + d + '</p>');
  	});
  	it('should have 2 actions, cancel and submit[yes, delete reservation]', function () {
		expect(wrapper.node.props.actions).to.have.length(2);
		expect(wrapper.node.props.actions[0].props.label).to.equal('CANCEL');
		expect(wrapper.node.props.actions[1].props.label).to.equal('YES, DELETE BOOK');
  	});
  	it('should set the state open: true when startDialog gets fired', function () {
    	wrapper.instance().startDialog();
		expect(wrapper.state().open).to.equal(true);
  	});
	it('pressing CANCEL should close the dialog', function () {
		wrapper.node.props.actions[0].props.onTouchTap();
    	expect(wrapper.state().open).to.equal(false);
  	});
	xit('pressing SUBMIT should call function deleteReservation when submit gets fired', function () {
		// wrapper.instance().startDialog();
		// var spy = sinon.stub(wrapper.instance(), 'deleteReservation').returns('hello');
		//expect(wrapper.node.props.actions[1].props.onTouchTap()).to.equal('hello');
    	//expect(wrapper.state().open).to.equal(false);
		// var spy = sinon.spy(wrapper.instance(), 'deleteReservation');
		// wrapper.node.props.actions[1].props.onTouchTap();
		// wrapper.node.props.actions[1].type.simulate('click');
		// console.log(wrapper.find('CANCEL'));
		// wrapper.find('FlatButton').simulate('click');;
		// console.log(wrapper.node.props.actions[1].type());
		// expect(wrapper.node.props.actions[1].props.label).to.equal('YES, DELETE RESERVATION');
    	// expect(spy.called).to.equal(true);
  	});
});