var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var FlatButton = require('material-ui/FlatButton').default;
var Dialog = require('material-ui/Dialog').default;
var DeleteReservationDialog = require('../views/components/DeleteReservationDialog.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

describe('<DeleteReservationDialog />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getR;
	before(function() {
		d = Date.now().toString();
			getR = function(){ console.log('got reservation!'); };
  		wrapper = shallow(
			  <DeleteReservationDialog 
			  		id={0} 
				  	bookId={1} 
				  	from={d}
				   	to={d} 
				   	getReservations={getR} 
				/>, {
		    context: {muiTheme},
		    childContextTypes: {muiTheme: React.PropTypes.object}
		});
	});
  	it('should have the props set', function () {
    	expect(wrapper.instance().props.id).to.equal(0);
    	expect(wrapper.instance().props.bookId).to.equal(1);
    	expect(wrapper.instance().props.from).to.equal(d);
    	expect(wrapper.instance().props.to).to.equal(d);
    	expect(wrapper.instance().props.getReservations).to.equal(getR);
  	});
  	it('should have initial state set to open: false', function () {
    	expect(wrapper.state().open).to.equal(false);
  	});
  	it('should have 1 child', function () {
    	expect(wrapper.children().length).to.equal(1);
  	});
  	it('should have 3 paragraphs corresponding to the book reservation data', function () {
    	expect(wrapper.find('div').children()).to.have.length(3);
		expect(wrapper.find('div').children().find('p')).to.have.length(3);
		expect(wrapper.find('div').childAt(0).html()).to.equal('<p>0:1</p>');
		expect(wrapper.find('div').childAt(1).html()).to.equal('<p>'+ d +'</p>');
		expect(wrapper.find('div').childAt(2).html()).to.equal('<p>'+ d +'</p>');
  	});
  	it('should have 2 actions, cancel and submit[yes, delete reservation]', function () {
		expect(wrapper.node.props.actions).to.have.length(2);
		expect(wrapper.node.props.actions[0].props.label).to.equal('CANCEL');
		expect(wrapper.node.props.actions[1].props.label).to.equal('YES, DELETE RESERVATION');
  	});
  	it('should set the state open: true when startDialog gets fired', function () {
    	wrapper.instance().startDialog();
		expect(wrapper.state().open).to.equal(true);
  	});
	it('pressing CANCEL should close the dialog', function () {
		wrapper.node.props.actions[0].props.onTouchTap();
    	expect(wrapper.state().open).to.equal(false);
  	});
	it('pressing SUBMIT should call function deleteReservation when submit gets fired', function () {
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