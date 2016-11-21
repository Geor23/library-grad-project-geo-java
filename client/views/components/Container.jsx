var React = require('react');
var Books = require('./Books.jsx');

var Container = React.createClass({
	render: function() {
		return (
			<div class="container">
				<Books></Books>
			</div>
		);
	}
});

module.exports = Container;
