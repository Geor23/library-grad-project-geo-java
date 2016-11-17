var React = require('react');

var BookForm = React.createClass({
    propTypes: {
        onBook: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            title: '',
            author: '',
            isbn: '',
            date: ''
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
    changePublishDate: function(ev) {
        this.setState({
            date: ev.target.value
        });
    },
    changeISBN: function(ev) {
        this.setState({
            isbn: ev.target.value
        });
    },
    addBook: function(ev) {
        ev.preventDefault();

        this.props.onBook({
            title: this.state.title,
            author: this.state.author,
            isbn: this.state.isbn,
            date: this.state.date
        });

        this.setState({
            title: '',
            author: '',
            isbn: '',
            date: ''
        });
    },
    render: function() {
        return (
            <form onSubmit={this.addBook}>
                <div>
                    <label htmlFor='title'>Title</label>
                    <div><input type='text' id='title' value={this.state.title} onChange={this.changeTitle} placeholder='Title' /></div>
                </div>
                <div>
                    <label htmlFor='author'>Author</label>
                    <div><input type='text' id='author' value={this.state.author} onChange={this.changeAuthor} placeholder='Author' /></div>
                </div>
                <div>
                    <label htmlFor='isbn'>ISBN</label>
                    <div><input type='text' id='isbn' value={this.state.isbn} onChange={this.changeISBN} placeholder='ISBN' /></div>
                </div>
                <div>
                    <label htmlFor='date'>Publish Date</label>
                    <div><input type='text' id='date' value={this.state.date} onChange={this.changePublishDate} placeholder='Publish Date' /></div>
                </div>
                <div>
                    <button type='submit'>Add Book</button>
                </div>
            </form>
        );
    }
});

var Books = React.createClass({
    propTypes: {
        books: React.PropTypes.array
    },
    getInitialState: function() {
        return {
            books: (this.props.books || [])
        };
    },
    onBook: function(book) {
        this.state.books.push(book);

        this.setState({
            books: this.state.books
        });
    },
    render: function() {
        var books = this.state.books.map(function(book) {
            return <Book title={book.Title} author={book.Author}></Book>;
        });

        return (
            <div>
                <BookForm onBook={this.onBook}></BookForm>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>{books}</tbody>
                </table>
            </div>
        );
    }
});

var Book = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        read: React.PropTypes.bool
    },
    getInitialState: function() {
        return {
            title: this.props.title,
            author: this.props.author
        };
    },
    handleChange: function(ev) {
        this.setState({
            read: !this.state.read
        });
    },
    render: function() {
        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td><input type='checkbox' checked={this.state.read} onChange={this.handleChange} /></td>
            </tr>
        );
    }
});

module.exports = Books;