var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var SeeReservationsDialog = require('../views/components/SeeReservationsDialog.jsx') ;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<SeeReservationsDialog />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getR;
	before(function() {
		d = Date.now().toString();
		getR = function() {console.log('hello')};
  		wrapper = shallow(
			  <SeeReservationsDialog 
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
  	it('should have initial state set to open: false, reservations: []', function () {
    	expect(wrapper.state().open).to.equal(false);
		expect(wrapper.state().reservations).to.deep.equal([]);
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
    it('if the state gets a reservation, the second should contain 1 Reservation element', function () {
		wrapper.setState({reservations: [{Id: 0, bookId: 1, from: 'now', to: 'to', getReservations: getR}]});
        expect(wrapper.childAt(1).children().length).to.equal(1);
        expect(wrapper.childAt(1).children().find('Reservation').length).to.equal(1);
    });
    it('pressing CANCEL should close the dialog', function () {
		wrapper.node.props.actions[0].props.onTouchTap();
    	expect(wrapper.state().open).to.equal(false);
  	});
  	it('should have 1 action, ok', function () {
		expect(wrapper.node.props.actions).to.have.length(1);
		expect(wrapper.node.props.actions[0].props.label).to.equal('OK');
  	});
});