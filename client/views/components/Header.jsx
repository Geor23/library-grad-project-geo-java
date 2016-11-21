var React = require('react');

var Header = React.createClass({
	goToSearch: function(ev) {
		console.log("go to search");
	},
	goToAddBook: function(ev) {
		console.log("go to add book");
	},
	render: function() {
		return (
			<div class="header">
				<div class="title">
					<h1>Library App</h1>
				</div>
				<div class="menu">
					<input type="button" value="Search" />
					<input type="button" value="Add Book" />
				</div>
			</div>
		);
	}
});

module.exports = Header;
