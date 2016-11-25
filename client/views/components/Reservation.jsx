var React = require('react');
var IconButton = require('material-ui/IconButton').default;
var EditIc = require('material-ui/svg-icons/content/create').default;
var DeleteIc = require('material-ui/svg-icons/content/clear').default;
var EditReservationDialog = require('./EditReservationDialog.jsx');
var DeleteReservationDialog = require('./DeleteReservationDialog.jsx');

var Reservation = React.createClass({
    propTypes: {
        id: React.PropTypes.number.isRequired,
        bookId: React.PropTypes.number.isRequired,
        from: React.PropTypes.string.isRequired,
        to: React.PropTypes.string.isRequired,
        getReservations: React.PropTypes.func.isRequired
    },
    deleteReservation: function(resId) {
        this.refs.delRes.startDialog();
    },
    editReservation: function(resId) {
        this.refs.editRes.startDialog();
    },
    getDate: function(date) {
        var d = new Date(date);
        return d.toDateString();
    },
    render: function() {
        return (
            <div>
                {this.getDate(this.props.from)} -{this.getDate(this.props.to)}
                <IconButton onClick={() => this.deleteReservation(this.props.id)}>
                    <DeleteIc color='#eaf2eb' />
                </IconButton>
                <IconButton onClick={() => this.editReservation(this.props.id)}>
                    <EditIc color='#eaf2eb' />
                </IconButton>
                <EditReservationDialog 
                    ref="editRes" 
                    id={this.props.id} 
                    bookId={this.props.bookId} 
                    from={this.props.from} 
                    to={this.props.to} 
                    getReservations={this.props.getReservations} 
                />
                <DeleteReservationDialog 
                    ref="delRes" 
                    id={this.props.id} 
                    bookId={this.props.bookId} 
                    from={this.props.from} 
                    to={this.props.to} 
                    getReservations={this.props.getReservations}
                />
            </div>
        );
    }
});

module.exports = Reservation;
