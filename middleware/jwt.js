var koaJWT = require('koa-jwt')
	,	appGlobals = require('app/appGlobals');

module.exports = koaJWT({
	secret: appGlobals.jwt_key
});