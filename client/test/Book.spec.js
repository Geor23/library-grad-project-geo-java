var React = require('react');
import { shallow, mount } from 'enzyme';
var chai = require( 'chai');
var sinon = require('sinon');
var expect = chai.expect;

var ListItem = require('material-ui/List').ListItem;
var AddReservationDialog = require('../views/components/AddReservationDialog.jsx');
var SeeReservationsDialog = require('../views/components/SeeReservationsDialog.jsx');
var EditBookDialog = require('../views/components/EditBookDialog.jsx');
var DeleteBookDialog = require('../views/components/DeleteBookDialog.jsx');
var Book = require('../views/components/Book.jsx') ;
var MenuItem = require('material-ui/MenuItem').default;

import getMuiTheme from 'material-ui/styles/getMuiTheme';

describe('<Book />', function () {
	const muiTheme = getMuiTheme(); 
	var wrapper, d, getBooks;
	 before(function() {
        d = Date.now().toString();
        getBooks=function(){console.log('hello')};
        wrapper = shallow(
            <Book 
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
  	it('should have 6 children', function () {
    	expect(wrapper.children().length).to.equal(6);
  	});
    it('should have 1 ListItem as a child', function () {
    	expect(wrapper.children().find(ListItem).length).to.equal(1);
  	});
    it('the ListItem child should contain the book info', function () {
    	expect(wrapper.children().find(ListItem).at(0).props().primaryText).to.equal('title');
        expect(wrapper.children().find(ListItem).at(0).props().secondaryText.props.children[0].props.children).to.equal('author');
        expect(wrapper.children().find(ListItem).at(0).props().secondaryText.props.children[2]).to.equal('isbn');
        expect(wrapper.children().find(ListItem).at(0).props().secondaryText.props.children[4]).to.equal(d);
  	});
  	it('should have 4 dialog references', function () {
        expect(wrapper.children().find(AddReservationDialog).node.ref).to.equal('addRes');
        expect(wrapper.children().find(SeeReservationsDialog).node.ref).to.equal('seeRes');
        expect(wrapper.children().find(EditBookDialog).node.ref).to.equal('editBook');
        expect(wrapper.children().find(DeleteBookDialog).node.ref).to.equal('delBook');
  	});
  	it('should have a right menu', function () {
		expect(wrapper.children().find(ListItem).at(0).props().rightIconButton).to.not.equal(undefined);
  	});
    it('the right menu should have 4 menu items[actions]', function () {
		expect(wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children.length).to.equal(4);
        expect(wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children[0].props.children).to.equal('Reserve');
        expect(wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children[1].props.children).to.equal('See Reservations');
        expect(wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children[2].props.children).to.equal('Edit Book');
        expect(wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children[3].props.children).to.equal('Delete Book');
  	});
    xit('the right menu items should each have the apropriate action', function () {
        var spy = sinon.spy(wrapper.instance(), 'startAddReservationDialog');
        console.log(wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children[0].props.onClick);
        wrapper.children().find(ListItem).at(0).props().rightIconButton.props.children[0].props.onClick();
        expect(spy.called).to.equal(true);
       
  	});
});