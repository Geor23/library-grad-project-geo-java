var React = require('react');
var ReactRouter = require('react-router');
var { Router, Route, IndexRoute, Link } = ReactRouter
var browserHistory = ReactRouter.browserHistory;
var Books = require('./Books.jsx');
var BookForm = require('./BookForm.jsx');

var Container = React.createClass({
	render: function() {
		return (
			<div className="container">
				<Router history={browserHistory}>
			    	<Route path="/" component={Books} />
			      	<Route path="/search" component={Books} />
			      	<Route path="/add" component={BookForm} />
			  	</Router>
			</div>
		);
	}
});

module.exports = Container;
