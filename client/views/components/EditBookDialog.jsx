var React = require('react');
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var DatePicker = require('material-ui/DatePicker').default;
var TextField = require('material-ui/TextField').default;

var EditBookDialog = React.createClass({
    propTypes: {
        id: React.PropTypes.number,
        title: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        isbn: React.PropTypes.string,
        date: React.PropTypes.string,
        getBooks: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            id: this.props.id,
            title: this.props.title,
            author: this.props.author,
            isbn: this.props.isbn,
            date: this.props.date,
            open: false
        };
    },
    changeTitle: function(ev) {
        this.setState({
            title: ev.target.value
        });
    },
    changeAuthor: function(ev) {
        this.setState({
            author: ev.target.value
        });
    },
    changePublishDate: function(ev, date) {
        this.setState({
            date: date
        });
    },
    changeISBN: function(ev) {
        this.setState({
            isbn: ev.target.value
        });
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    editBook: function() {
        var update = this.props.getBooks;
        var book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn,
            date: this.state.date
        };

        $.ajax({
            url: 'http://localhost:3333/api/books', 
            type: 'PUT',
            data: book,
            success: (function() {
                update();
            })
        });

        this.setState({open: false});
    },
    render: function() {
        const actions = [
          <FlatButton
            label="CANCEL"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.closeDialog}
          />,
          <FlatButton
            label="SUBMIT"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.editBook}
          />,
        ];
        var that = this;
        var dialStyle = {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            textAlign: 'center',
            alignItems: 'center'
        };
        var elemStyle = {
            display: 'flex',
            flexDirection: 'column'
        };
        var fieldStyle = {
            display: "block",
            margin: 10
        };
        return (
            <Dialog
                title="Edit book"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                bodyStyle={dialStyle}
            >
                <form onSubmit={this.editBook}>
                    <TextField 
                        id='title' 
                        value={this.state.title} 
                        onChange={this.changeTitle} 
                        hintText="Title" 
                        floatingLabelText="Title"
                        style={fieldStyle} 
                    />
                    <TextField 
                        id='author' 
                        value={this.state.author} 
                        onChange={this.changeAuthor} 
                        hintText="Author" 
                        floatingLabelText="Author"
                        style={fieldStyle} 
                    />
                    <TextField 
                        id='isbn' 
                        value={this.state.isbn} 
                        onChange={this.changeISBN} 
                        hintText="ISBN" 
                        floatingLabelText="ISBN"
                        style={fieldStyle} 
                    />
                    <DatePicker 
                        id='date' 
                        value={new Date(this.state.date)} 
                        onChange={this.changePublishDate} 
                        hintText="Publish Date" 
                        floatingLabelText="Publish Date"
                        style={fieldStyle} 
                    />
                </form>
            </Dialog>
        );
    }
});

module.exports = EditBookDialog;
