var LibraryBox = React.createClass({
    render: function () {
        return (
            <div className="LibraryBox">
                Hi you!
            </div>
        );
    }
});

ReactDOM.render(
    <LibraryBox />,
    document.getElementById('content')
);