var React = require('react');

var Header = React.createClass({
	goToSearch: function(ev) {
		console.log("go to search");
	},
	goToAddBook: function(ev) {
		console.log("go to add book");
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
					<input type="button" value="Search" />
					<input type="button" value="Add Book" />
				</div>
			</div>
		);
	}
});

module.exports = Header;
