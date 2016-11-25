var React = require('react');
var ReactRouter = require('react-router');
var browserHistory = ReactRouter.browserHistory;
var IconButton = require('material-ui/IconButton').default;
var SearchIc = require('material-ui/svg-icons/action/search').default;
var AddIc = require('material-ui/svg-icons/content/add').default;
var {yellow500, blue500} = require('material-ui/styles/colors') ;
var Paper = require('material-ui/Paper').default;

var Header = React.createClass({
	goToSearch: function(ev) {
		browserHistory.push('/search');
	},
	goToAddBook: function(ev) {
		browserHistory.push('/add');
	},
	render: function() {
		var headerStyle = {
			top: 0,
			height: 100,
			width: "100%",
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			margin: 0,
			textAlign: 'center',
			alignItems: 'center',
			backgroundColor: '#032b05',
			color: '#eaf2eb'
		};
		var titleStyle = {
			letterSpacing: 10,
			fontFamily: "'Bitter', serif"
		};
		return (
			<Paper style={headerStyle} zDepth={3}>
				<h1 style={titleStyle}>LIBRARY APP</h1>
				<div className="menu">
					<IconButton onClick={this.goToSearch}><SearchIc color='#eaf2eb' /></IconButton>
					<IconButton onClick={this.goToAddBook}><AddIc color='#eaf2eb' /></IconButton>
				</div>
			</Paper>
		);
	}
});

module.exports = Header;
