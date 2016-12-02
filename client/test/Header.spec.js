var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var Header = require('../views/components/Header.jsx') ;
var IconButton = require('material-ui/IconButton').default;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<Header />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper;
	 before(function() {
        wrapper = shallow(
            <Header />, {
                context: {muiTheme},
                childContextTypes: {muiTheme: React.PropTypes.object}
        });
    });
  	it('should have 2 children', function () {
    	expect(wrapper.children().length).to.equal(2);
  	});
    it('should have 1 Title as a child', function () {
    	expect(wrapper.childAt(0).type()).to.equal('h1');
    	expect(wrapper.childAt(0).children().length).to.equal(1);
    	expect(wrapper.childAt(0).childAt(0).node).to.equal('LIBRARY APP');
  	});
    it('should have a menu with 2 buttons as children', function () {
    	expect(wrapper.childAt(1).props().className).to.equal('menu');
    	expect(wrapper.childAt(1).children().length).to.equal(2);
        expect(wrapper.childAt(1).childAt(0).type()).to.equal(IconButton);
        expect(wrapper.childAt(1).childAt(1).type()).to.equal(IconButton);
  	});
});