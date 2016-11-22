var React = require('react');
var Book = require('./Book.jsx');
var BookForm = require('./BookForm.jsx');

var Books = React.createClass({
    propTypes: {
        books: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            books: (this.props.books || [])
        };
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
