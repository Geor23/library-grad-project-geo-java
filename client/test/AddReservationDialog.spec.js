var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var DatePicker = require('material-ui/DatePicker').default;
var AddReservationDialog = require('../views/components/AddReservationDialog.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<AddReservationDialog />', function() {
    const muiTheme = getMuiTheme();
    var wrapper, d;
    before(function() {
        d = Date.now().toString();
        wrapper = shallow(
            <AddReservationDialog 
                id={0} 
                title={'title'}
                author={'author'}
                isbn={'isbn'}
                date={d}
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
    });
    it('should have initial state set to open: false', function () {
    	expect(wrapper.state().open).to.equal(false);
  	});
    it('should have 2 actions, cancel and submit', function () {
		expect(wrapper.node.props.actions).to.have.length(2);
		expect(wrapper.node.props.actions[0].props.label).to.equal('CANCEL');
		expect(wrapper.node.props.actions[1].props.label).to.equal('SUBMIT');
  	});
  	it('should have 2 children', function () {
    	expect(wrapper.children().length).to.equal(2);
  	});
    it('the first should have 4 children[book info]', function () {
    	expect(wrapper.childAt(0).children().length).to.equal(4);
  	});
    it('the first should contain the book info', function () {
    	expect(wrapper.childAt(0).childAt(0).html()).to.equal('<p>0: title</p>');
        expect(wrapper.childAt(0).childAt(1).html()).to.equal('<p>author</p>');
        expect(wrapper.childAt(0).childAt(2).html()).to.equal('<p>isbn</p>');
        expect(wrapper.childAt(0).childAt(3).html()).to.equal('<p>' + d + '</p>');
  	});
    it('the second should contain two date pickers', function () {
        expect(wrapper.childAt(1).children().length).to.equal(3);
        expect(wrapper.childAt(1).children().find(DatePicker).length).to.equal(2);
    });
    it('should set the state open: true when startDialog gets fired', function () {
    	wrapper.instance().startDialog();
		expect(wrapper.state().open).to.equal(true);
  	});
    it('pressing CANCEL should close the dialog', function () {
		wrapper.node.props.actions[0].props.onTouchTap();
    	expect(wrapper.state().open).to.equal(false);
  	});
    xit('pressing SUBMIT should call function addReservation', function () {
		wrapper.instance().startDialog();
        // sinon.stub(wrapper.instance(), 'addReservation', function(){return 'hello'});
        wrapper.node.props.actions[1].props.onTouchTap();
        // console.log(wrapper.instance().addReservation);
        // console.log(wrapper.node.props.actions[1].props.onTouchTap.bind.Function);
		// var spy = sinon.spy(wrapper.instance(), 'addReservation');
		// expect(wrapper.node.props.actions[1].props.onTouchTap()).to.equal('hello');
    	expect(addReservation.called).to.equal(true);
  	});
    xit('triggering onChange from -Reserve from- will call handleChangeMinDate and change state', function () {
		wrapper.instance().startDialog();
        // sinon.stub(wrapper.instance(), 'addReservation', function(){return 'hello'});
        wrapper.node.props.actions[1].props.onTouchTap();
        // console.log(wrapper.instance().addReservation);
        // console.log(wrapper.node.props.actions[1].props.onTouchTap.bind.Function);
		// var spy = sinon.spy(wrapper.instance(), 'addReservation');
		// expect(wrapper.node.props.actions[1].props.onTouchTap()).to.equal('hello');
    	expect(addReservation.called).to.equal(true);
  	});
    xit('triggering onChange from -Reserve until- will call handleChangeMaxDate and change state', function () {
		wrapper.instance().startDialog();
        // sinon.stub(wrapper.instance(), 'addReservation', function(){return 'hello'});
        wrapper.node.props.actions[1].props.onTouchTap();
        // console.log(wrapper.instance().addReservation);
        // console.log(wrapper.node.props.actions[1].props.onTouchTap.bind.Function);
		// var spy = sinon.spy(wrapper.instance(), 'addReservation');
		// expect(wrapper.node.props.actions[1].props.onTouchTap()).to.equal('hello');
    	expect(addReservation.called).to.equal(true);
  	});
});