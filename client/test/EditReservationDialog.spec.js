var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var EditReservationDialog = require('../views/components/EditReservationDialog.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<EditReservationDialog />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getR;
	before(function() {
		d = Date.now().toString();
			getR = function(){ console.log('got reservation!'); };
  		wrapper = shallow(
			  <EditReservationDialog 
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
  	it('should have 2 DatePicker children', function () {
    	expect(wrapper.childAt(0).find('DatePicker').length).to.equal(2);
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