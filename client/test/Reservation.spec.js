var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;
var IconButton = require('material-ui/IconButton').default;

var Reservation = require('../views/components/Reservation.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<Reservation />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getR;
	before(function() {
		d = Date.now().toString();
		getR = function(){ console.log('got reservation!'); };
  		wrapper = shallow(
			  <Reservation 
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
  	it('should have 6 children', function () {
    	expect(wrapper.children().length).to.equal(6);
  	});
  	it('should have 2 IconButton children', function () {
    	expect(wrapper.find(IconButton).length).to.equal(2);
  	});
  	it('should have 1 EditReservationDialog child', function () {
		expect(wrapper.find('EditReservationDialog').length).to.equal(1);
  	});
  	it('should have 1 DeleteReservationDialog child', function () {
    	expect(wrapper.find('DeleteReservationDialog').length).to.equal(1);
  	});
});