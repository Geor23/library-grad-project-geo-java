var React = require('react');
var ReactRouter = require('react-router');
var { Router, Route, IndexRoute, Link } = ReactRouter
var browserHistory = ReactRouter.browserHistory;

var Header = React.createClass({
	goToSearch: function(ev) {
		console.log("go to search");
		browserHistory.push('/search');
	},
	goToAddBook: function(ev) {
		console.log("go to add book");
		browserHistory.push('/add');
	},
	render: function() {
		var headerStyle = {
			top: 0,
			height: 100,
			width: "100%",
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			margin: 0,
			textAlign: 'center',
			alignItems: 'center',
			backgroundColor: 'black',
			color: 'white'
		}
		return (
			<div style={headerStyle}>
				<div className="title">
					<h1>Library App</h1>
				</div>
				<div className="menu">
					<input type="button" onClick={this.goToSearch} value="Search" />
					<input type="button" onClick={this.goToAddBook} value="Add Book" />
				</div>
			</div>
		);
	}
});

module.exports = Header;
