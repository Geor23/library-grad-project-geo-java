var React = require('react');
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;

var DeleteReservationDialog = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        bookId: React.PropTypes.number.isRequired,
        from: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired,
        getReservations: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return {
            open: false
        };
    },
    startDialog: function() {
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    deleteReservation: function() {
        var update = this.props.getReservations;
        var that = this;

        var data = {
            id: this.props.id
        };

        $.ajax({
            url: 'http://localhost:3333/api/bookreservations', 
            type: 'DELETE',
            data: data,
            success: (function() {
                update();
                that.setState({open: false});
            })
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
            label="YES, DELETE RESERVATION"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.deleteReservation}
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
            <Dialog
                title="Are you certain you want to delete this book reservation ?"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
                bodyStyle={dialStyle}
            >
                <div style={elemStyle}>
                    <p>{this.props.id}:{this.props.bookId}</p>
                    <p>{this.props.from}</p>
                    <p>{this.props.to}</p>
                </div>
            </Dialog>
        );
    }
});

module.exports = DeleteReservationDialog;
