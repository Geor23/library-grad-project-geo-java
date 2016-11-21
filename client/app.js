var React = require('react');
var Container = require('./views/components/Container.jsx');
var Header = require('./views/components/Header.jsx');

React.render(
	<div>
		<Header />
		<Container />
	</div>, 
	document.getElementById('main')
);
