var React = require('react');
var D = require('react-dom-wrapper');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
            title: "I AM TITLE"
        };
    },
    getInitialState: function() {
        return {
            text: 'Hi there',
            num: 0
        };
    },
    componentDidMount: function() {
        setInterval(function() {
            this.setState({
                num: this.state.num + 1
            });
        }.bind(this), 1000);
    },
    render: function() {
        return D(['div', this.state.text, ' ', this.state.num ]);
    }
});
