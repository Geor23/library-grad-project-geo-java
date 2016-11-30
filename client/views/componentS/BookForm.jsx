var React = require('react');
var TextField = require('material-ui/TextField').default;
var RaisedButton = require('material-ui/RaisedButton').default;
var Add = require('material-ui/svg-icons/content/add').default;
var DatePicker = require('material-ui/DatePicker').default;

var BookForm = React.createClass({
    propTypes: {
        onBook: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            title: '',
            author: '',
            isbn: '',
            date: {}
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
    addBook: function(ev) {
        ev.preventDefault();

        var book = {
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn,
            date: this.state.date
        };

        $.post('http://localhost:3333/api/books', book)
            .done(function() {
                alert("Book has been added successfully");
            }).fail(function() {
                alert("ERROR");
            });

        this.setState({
            title: '',
            author: '',
            isbn: '',
            date: {}
        });
    },
    render: function() {
        var fieldStyle = {
            display: "block",
            margin: 10
        };
        return (
            
            <form onSubmit={this.addBook}>
                <h6>
                    <i>
                        To add a book to the library, please complete the details below. 
                    </i>
                </h6>
                <br />
                <TextField 
                    id='title' 
                    style={fieldStyle} 
                    value={this.state.title} 
                    onChange={this.changeTitle} 
                    hintText="Title" 
                    floatingLabelText="Title"
                />
                <TextField 
                    id='author' 
                    style={fieldStyle} 
                    value={this.state.author} 
                    onChange={this.changeAuthor} 
                    hintText="Author" 
                    floatingLabelText="Author"
                />
                <TextField 
                    id='isbn' 
                    style={fieldStyle} 
                    value={this.state.isbn} 
                    onChange={this.changeISBN} 
                    hintText="ISBN" 
                    floatingLabelText="ISBN"
                />
                <DatePicker 
                    id='date' 
                    style={fieldStyle} 
                    value={this.state.date} 
                    onChange={this.changePublishDate} 
                    hintText="Publish Date" 
                    floatingLabelText="Publish Date"
                />
                <br />
                <RaisedButton
                    label="ADD BOOK"
                    labelPosition="before"
                    icon={<Add />} 
                    type='submit'
                />
            </form>
        );
    }
});

module.exports = BookForm;
