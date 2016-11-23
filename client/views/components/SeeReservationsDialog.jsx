var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;

var SeeReservationsDialog = React.createClass({
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
            open: false,
            reservations: []
        };
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    render: function() {
        const actions = [
          <FlatButton
            label="OK"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.closeDialog}
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
        var reserv = this.state.reservations.map(function(res) {
            return <div>{res.from} - {res.to} </div>
        });
        return (
            <Dialog
                title="See reservations"
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
                    {reserv}
                </div>
            </Dialog>
        );
    }
});

module.exports = SeeReservationsDialog;
