var router = require('koa-router')()
	,	paths = require('app/appGlobals').paths
  , path = require('path')
	,	_ = require('lodash')
	,	UserController = require(path.join(paths.controllersDir, 'user.controller'));

router
	.post('/login', UserController.login)
	.post('/logout', UserController.logout);

module.exports = router;