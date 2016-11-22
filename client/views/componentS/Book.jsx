var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;

var Book = React.createClass({
    propTypes: {
        id: React.PropTypes.number,
        title: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        isbn: React.PropTypes.string,
        date: React.PropTypes.string
    },
    getInitialState: function() {
        return {
            id: this.props.id,
            title: this.props.title,
            author: this.props.author,
            isbn: this.props.ISBN,
            date: this.props.date,
            open: false
        };
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    render: function() {
        const actions = [
          <FlatButton
            label="Ok"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.closeDialog}
          />,
        ];
        return (
        // jsx -> print result of ternary or expression with {}
            <tr onClick={this.startDialog}>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{this.props.isbn}</td>
                <td>{this.props.date}</td>
                <Dialog
                  title="Dialog With Date Picker"
                  actions={actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                >
                  Open a Date Picker dialog from within a dialog.
                  <DatePicker hintText="Date Picker" />
                </Dialog>
            </tr>
        );
    }
});

module.exports = Book;
