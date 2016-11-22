var React = require('react');
var Book = require('./Book.jsx');
var BookForm = require('./BookForm.jsx');

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
        $.get('http://localhost:3333/api/books')
        .done(function(data) {
            return data;
        }).fail(function(err) {
            return [];
            alert("ERROR");
        });
    },
    componentDidMount: function() {
        var that = this;
        $.get('http://localhost:3333/api/books')
        .done(function(data) {
            that.setState({ books: data });
        }).fail(function(err) {
            alert("ERROR");
        });
    },
    render: function() {
        var books = this.state.books.map(function(book) {
            return <Book id={book.Id} title={book.Title} author={book.Author} isbn={book.ISBN} date={book.PublishDate}></Book>;
        });
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>ISBN</th>
                            <th>Publish Date</th>
                        </tr>
                    </thead>
                    <tbody>{books}</tbody>
                </table>
            </div>
        );
    }
});

module.exports = Books;
