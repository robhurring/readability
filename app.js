'use strict';

var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  toobusy = require('toobusy');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// rate limit
app.use(function(req, res, next) {
  if(toobusy()) {
    var status = 503,
      error = 'I\'m busy right now, sorry.';

    res.format({
      json: function() {
        res.json(status, {
          error: error
        });
      },
      default: function() {
        res.send(status, error);
      }
    });
  } else {
    next();
  }
});
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.locals({
  title: 'Readability'
});

app.get('/', routes.index);
app.get('/fetch', routes.fetch);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});
