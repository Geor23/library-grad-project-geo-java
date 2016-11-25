var React = require('react');
var Book = require('./Book.jsx');
var List = require('material-ui/List').List;

var Books = React.createClass({
    propTypes: {
        books: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            books: []
        };
    },
    getBooks: function() {
        var that = this;
        $.get('http://localhost:3333/api/books')
        .done(function(data) {
            that.setState({ books: data });
        }).fail(function(err) {
            alert("ERROR");
        });
    },
    componentDidMount: function() {
        this.getBooks();
    },
    render: function() {
        var that = this;
        var listStyle = {
            height: "100%",
            minWidth: "80%",
            overflowY: "auto",
            overflowX: "hidden"
        };
        var books = this.state.books.map(function(book) {
            return <Book 
                        key={book.Id}
                        id={book.Id} 
                        title={book.Title} 
                        author={book.Author} 
                        isbn={book.ISBN} 
                        date={book.PublishDate} 
                        getBooks={that.getBooks}
                    ></Book>;
        });
        return (
                <List style={listStyle}>
                    <div>{books}</div>
                </List>
        );
    }
});

module.exports = Books;
