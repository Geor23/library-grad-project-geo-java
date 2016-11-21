var React = require('react');

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

module.exports = Book;
