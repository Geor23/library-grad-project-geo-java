var React = require('react');
var DatePicker = require('material-ui/DatePicker').default;
var Dialog = require('material-ui/Dialog').default;
var FlatButton = require('material-ui/FlatButton').default;
var IconButton = require('material-ui/IconButton').default;
var EditIc = require('material-ui/svg-icons/content/create').default;
var DeleteIc = require('material-ui/svg-icons/content/clear').default;
var EditReservationDialog = require('./EditReservationDialog.jsx');

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
            isbn: this.props.isbn,
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
    deleteReservation: function(resId) {
        var data = {
            id: resId
        };

        $.ajax({
            url: 'http://localhost:3333/api/bookreservations', 
            type: 'DELETE',
            data: data,
            success: (function() {
                alert("The book has been deleted successfully");
            })
        });

        this.setState({open: false});
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
            return <div>
                        {that.getDate(res.from)} -{that.getDate(res.to)}
                        <IconButton onClick={() => that.deleteReservation(res.Id)}>
                            <DeleteIc color='#eaf2eb' />
                        </IconButton>
                        <IconButton onClick={() => that.editReservation(res.Id)}>
                            <EditIc color='#eaf2eb' />
                        </IconButton>
                        <EditReservationDialog ref={refer} id={res.Id} bookId={res.bookId} from={res.from} to={res.to} />
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
