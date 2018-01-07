var app = require('koa')()
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , session = require('koa-session')
  , body = require('koa-better-body')
  , koaResponseTime = require('koa-response-time')
  , path = require('path');

// require all paths
var appGlobals = require('app/appGlobals');
var paths = appGlobals.paths;

var mongoose = require(paths.mongoose)
  , routes = require(paths.routes);

// auth middleware  
var authMiddleware = require(paths.auth)
  , jwt = require(paths.jwt)

// error handler
onerror(app);

// global middleware


// Uses KeyGrip by default
app.keys = [appGlobals.session_key];
app
  .use(views('views', {
    root: __dirname + '/views',
    default: 'jade'
  }))
  .use(body())
  .use(json())
  .use(logger())
  .use(koaResponseTime())
  .use(function *(next){
    // response time
    var start = new Date;
    yield next;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
  })
  .use(require('koa-static')(__dirname + '/public')) // directory to static assets
  .use(session(app))

// include before other routes
  // .use(function *(next){
  //   this.set('Access-Control-Allow-Origin', '*');
  //   yield next;
  // })

// middleware
  .use(authMiddleware)

// routes definition
  .use(routes)

// error-handling
  .on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;