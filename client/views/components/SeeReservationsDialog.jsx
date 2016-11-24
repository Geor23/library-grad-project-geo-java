var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var IconButton = require('material-ui/IconButton').default;
var EditIc = require('material-ui/svg-icons/content/create').default;
var DeleteIc = require('material-ui/svg-icons/content/clear').default;
var EditReservationDialog = require('./EditReservationDialog.jsx');
var DeleteReservationDialog = require('./DeleteReservationDialog.jsx');

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
        this.setState({open: true});
    },
    closeDialog: function() {
        this.setState({open: false});
    },
    deleteReservation: function(resId) {
        var ref = "delRes"+resId;
        this.refs[ref].startDialog();
    },
    editReservation: function(resId) {
        var ref = "editRes"+resId;
        this.refs[ref].startDialog();
    },
    componentDidMount: function() {
        var that = this;
        $.get('http://localhost:3333/api/bookreservations/' + this.state.id )
        .done(function(data) {
            that.setState({ reservations: data });
        }).fail(function(err) {
            alert("ERROR");
        });
    },
    getDate: function(date) {
        var d = new Date(date);
        return d.toDateString();
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
        var that = this;
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
            var refer = "editRes" + res.Id;
            var refr = "delRes" + res.Id;

            return <div>
                        {that.getDate(res.from)} -{that.getDate(res.to)}
                        <IconButton onClick={() => that.deleteReservation(res.Id)}>
                            <DeleteIc color='#eaf2eb' />
                        </IconButton>
                        <IconButton onClick={() => that.editReservation(res.Id)}>
                            <EditIc color='#eaf2eb' />
                        </IconButton>
                        <EditReservationDialog ref={refer} id={res.Id} bookId={res.bookId} from={res.from} to={res.to} />
                        <DeleteReservationDialog ref={refr} id={res.Id} bookId={res.bookId} from={res.from} to={res.to} />
                    </div>
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
