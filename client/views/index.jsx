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
        var that = this;
        $.post('http://localhost:3333/api/books/add', book)
            .done(function() {
                alert("Book has been added successfully");
                that.setState({
                    books: that.state.books // not updating state here!
                });
            }).fail(function() {
                alert("ERROR");
            });
    },
    render: function() {
        var books = this.state.books.map(function(book) {
            return <Book id={book.Id} title={book.Title} author={book.Author} isbn={book.ISBN} date={book.PublishDate}></Book>;
        });

        return (
            <div>
                <BookForm onBook={this.onBook}></BookForm>
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
            date: this.props.date
        };
    },
    render: function() {
        //can add variable calculations here and reference in return with {}
        // ...this.props -> pass all props to the child 
        // not jsx -> use a variable and if/else or ternary
        return (
        // jsx -> print result of ternary or expression with {}
            <tr>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{this.props.isbn}</td>
                <td>{this.props.date}</td>
            </tr>
        );
    }
});

module.exports = Books;