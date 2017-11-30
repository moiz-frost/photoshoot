var compose = require('koa-compose')
  , path = require('path')
  , glob = require('glob');

// routes directory
var routesDir = path.join(__dirname, '/../routes/');

// all routes will be stored here
var routes = [];

// get all route paths ending with '.js'
glob.sync(routesDir + '*.js').forEach(function(routePath) {
  var route = require(path.resolve(routePath));
  routes.push(route);
});

// takes an array of routers
function combineRouters (routers) {
  if (!Array.isArray(routers)) {
    routers = Array.prototype.slice.call(arguments);
  };

  var middleware = [];

  routers.forEach(function (router) {
    // console.log((router.allowedMethods())());
    // console.log((router.routes().router) == router); // Same thing
    middleware.push(router.routes());
    middleware.push(router.allowedMethods());
  });

  return compose(middleware);
}

// combine all routes
var combinedRoutes = combineRouters(routes);

module.exports = combinedRoutes;