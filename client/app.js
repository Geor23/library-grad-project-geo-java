var ReactDOM = require('react-dom');
var Container = require('./views/components/Container.jsx');
var Header = require('./views/components/Header.jsx');
var darkBaseTheme = require('material-ui/styles/baseThemes/darkBaseTheme').default;
var MuiThemeProvider = require('material-ui/styles/MuiThemeProvider').default;
var getMuiTheme = require('material-ui/styles/getMuiTheme').default;
var injectTapEventPlugin = require('react-tap-event-plugin');

injectTapEventPlugin();

ReactDOM.render((
	<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
		<div>
			<Header />
			<Container />
		</div>
	</MuiThemeProvider>
	), document.getElementById('main')
);
