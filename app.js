var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , session = require('koa-session');

var mongoose = require(__dirname + '/database/connection');

var index = require('./routes/index');
var users = require('./routes/users');

// error handler
onerror(app);

// global middlewares
app
  .use(views('views', {
    root: __dirname + '/views',
    default: 'jade'
  }))
  .use(require('koa-bodyparser')())
  .use(json())
  .use(logger())
  .use(function *(next){
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
  })
  .use(require('koa-static')(__dirname + '/public'))
  .use(session(app))

// routes definition
  .use(index.routes(), index.allowedMethods())
  .use(users.routes(), users.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;