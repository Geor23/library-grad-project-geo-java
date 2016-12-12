var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var Reservation = require('./Reservation.jsx');

var SeeReservationsDialog = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        title: React.PropTypes.string.isRequired,
        author: React.PropTypes.string.isRequired,
        isbn: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired
    },
    getInitialState: function() {
        return {
            open: false,
            reservations: []
        };
    },
    startDialog: function() {
        this.getReservations();
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    getReservations: function() {
        var that = this;
        $.get('http://localhost:3333/api/bookreservations/' + this.props.id )
        .done(function(data) {
            that.setState({ reservations: data });
        }).fail(function(err) {
            alert("ERROR");
        });
    },
    render: function() {
        var that = this;
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
            return <Reservation 
                        key={res.id}
                        id={res.id} 
                        bookId={res.book} 
                        from={res.from} 
                        to={res.to} 
                        getReservations={that.getReservations} 
                    />
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
