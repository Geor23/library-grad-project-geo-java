var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
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
})