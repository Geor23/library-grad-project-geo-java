var React = require('react');
var Books = require('./Books.jsx');

var Container = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Books></Books>
			</div>
		);
	}
});

module.exports = Container;
