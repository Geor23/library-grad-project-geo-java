var React = require('react');
var ReactRouter = require('react-router');
var { Router, Route, IndexRoute, Link } = ReactRouter
var browserHistory = ReactRouter.browserHistory;
var Books = require('./Books.jsx');
var BookForm = require('./BookForm.jsx');
var Paper = require('material-ui/Paper').default;

var Container = React.createClass({
	render: function() {
		var pageStyle = {
			top: 100,
			position: 'absolute',
			bottom: 0,
			width: "100%",
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			textAlign: 'center',
			alignItems: 'center',
			backgroundColor: 'white'
		};
		var containerStyle = {
			height: '100%',
			width: "60%",
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-around',
			textAlign: 'center',
			alignItems: 'center',
			backgroundColor: '#eaf2eb',
			color: "black",
			overflowY: "auto",
			overflowX: "hidden"
		};
		return (
			<div style={pageStyle}>
				<Paper style={containerStyle} zDepth={3}>
					<Router history={browserHistory}>
				    	<Route path="/" component={Books} />
				      	<Route path="/search" component={Books} />
				      	<Route path="/add" component={BookForm} />
				  	</Router>
				</Paper>
			</div>
		);
	}
});

module.exports = Container;
