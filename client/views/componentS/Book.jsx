var React = require('react');
var MenuItem = require('material-ui/MenuItem').default;
var IconMenu = require('material-ui/IconMenu').default;
var MoreVertIcon = require('material-ui/svg-icons/navigation/more-vert').default;
var IconButton = require('material-ui/IconButton').default;
var Colors = require('material-ui/styles/colors');
var grey400 = Colors.grey400;
var darkBlack = Colors.darkBlack;
var Divider = require('material-ui/Divider').default;
var ListItem = require('material-ui/List').ListItem;
var connect = require('react-redux').connect;
var AddReservationDialog = require('./AddReservationDialog.jsx');
var SeeReservationsDialog = require('./SeeReservationsDialog.jsx');
var EditBookDialog = require('./EditBookDialog.jsx');

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
            isbn: this.props.isbn,
            date: this.props.date
        };
    },
    startAddReservationDialog: function() {
        this.refs.addRes.startDialog();
    },
    startSeeReservationsDialog: function() {
        this.refs.seeRes.startDialog();
    },
    startEditBookDialog: function() {
        this.refs.editBook.startDialog();
    },
    deleteBook: function() {
        var data = {
            id: this.props.id
        };

        $.ajax({
            url: 'http://localhost:3333/api/books', 
            type: 'DELETE',
            data: data,
            success: (function() {
                alert("The book has been deleted successfully");
            })
        });

        this.setState({open: false});
    },
    render: function() {
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={grey400} />
            </IconButton>
        );
        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={this.startAddReservationDialog}>Reserve</MenuItem>
                <MenuItem onClick={this.startSeeReservationsDialog}>See reservations</MenuItem>
                <MenuItem onClick={this.startEditBookDialog}>Edit Book</MenuItem>
                <MenuItem onClick={this.deleteBook}>Delete Book</MenuItem>
            </IconMenu>
        );
        return (
            <div>
                <ListItem
                    rightIconButton={rightIconMenu}
                    primaryText={this.props.title}
                    secondaryText={
                        <p>
                            <span style={{color: darkBlack}}>{this.props.author}</span>
                            <br />
                            {this.props.isbn} - {this.props.date}
                        </p>
                    }
                    secondaryTextLines={2}
                />
                <Divider inset={true} />
                <AddReservationDialog ref="addRes" id={this.props.id} title={this.props.title} author={this.props.author} isbn={this.props.isbn} date={this.props.date} />
                <SeeReservationsDialog ref="seeRes" id={this.props.id} title={this.props.title} author={this.props.author} isbn={this.props.isbn} date={this.props.date} />
                <EditBookDialog ref="editBook" id={this.props.id} title={this.props.title} author={this.props.author} isbn={this.props.isbn} date={this.props.date} />
            </div>
        );
    }
});

module.exports = Book;
