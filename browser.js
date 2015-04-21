var React = require('react');
var director = require('director');
var components = require('./components');
var routes = require('./routes');

var router = new director.Router();
router.configure({ html5history: true });

var rootNode = document.getElementById('main');

for (var route in routes) {
  router.on(route, function() {
    var props = {
      routeParams: Array.prototype.slice.call(arguments)
    };
    var element = React.createElement(components[routes[route]], props);
    if (element._store.props.title) {
      window.title = element._store.props.title;
    }
    React.render(element, rootNode);
  });
}

// Mount already prerendered component
React.render(React.createElement(components[window._component], window._props), document.getElementById('main'));

router.init();
