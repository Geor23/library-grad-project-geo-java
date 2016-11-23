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
    addReservation: function() {
        var book = {
            id: this.props.id
        };

        var fromDate = this.state.minDate;
        var toDate = this.state.maxDate;

        var data = {
            book: book,
            from: fromDate,
            to: toDate
        };

        $.post('http://localhost:3333/api/bookreservations', data)
            .done(function() {
                alert("The book has been reserved successfully");
            }).fail(function() {
                alert("ERROR");
            });

        this.setState({open: false});
    },
    handleChangeMinDate: function(event, date) {
        this.setState({
            minDate: date,
        });
    },
    handleChangeMaxDate: function(event, date) {
        this.setState({
            maxDate: date,
        });
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
            onTouchTap={this.addReservation}
          />,
        ];
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
        return (
        // jsx -> print result of ternary or expression with {}
            <tr onClick={this.startDialog}>
                <td>{this.props.id}</td>
                <td>{this.props.title}</td>
                <td>{this.props.author}</td>
                <td>{this.props.isbn}</td>
                <td>{this.props.date}</td>
                <Dialog
                    title="Add reservation"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    bodyStyle={dialStyle}
                >
                    <div style={elemStyle}>
                        <p>{this.props.id}: {this.props.title}</p>
                        <p>{this.props.author}</p>
                        <p>{this.props.isbn}</p>
                        <p>{this.props.date}</p>
                    </div>
                    <div style={elemStyle}>
                        Please select the reservation period.
                        <DatePicker onChange={this.handleChangeMinDate} hintText="Reserve from" />
                        <DatePicker onChange={this.handleChangeMaxDate} hintText="Reserve until" />
                    </div>
                </Dialog>
            </tr>
        );
    }
});

module.exports = Book;
