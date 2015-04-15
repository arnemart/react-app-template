var app = require('connect')();
var serveStatic = require('serve-static');
var compression = require('compression');
var director = require('director');
var fs = require('fs');
var React = require('react');
var whiskers = require('whiskers');

var layout = fs.readFileSync('html/layout.html').toString();

var routes = require('./routes');

var router = new director.http.Router();

for (var route in routes) {
  router.get(route, function() {
    this.res.writeHead(200, { 'Content-Type': 'text/html' });
    var props = {
      routeParams: Array.prototype.slice.call(arguments)
    };
    var component = routes[route];
    var element = React.createElement(require('./components/' + component), props);

    var renderedComponent = React.renderToString(element);

    this.res.end(whiskers.render(layout, {
      title: element._store.props.title,
      content: renderedComponent,
      component: component,
      props: JSON.stringify(props)
    }));
  });
}

function fourohfour(res) {
  res.writeHead(404);
  res.end('nooo');
}

app.use(compression());
app.use(serveStatic('public'));

app.use(function (req, res) {
  router.dispatch(req, res, function (err) {
    if (err) {
      fourohfour(res);
    }
  });
});


app.listen(process.env.PORT || 8000);
