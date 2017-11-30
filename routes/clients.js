var router = require('koa-router')()
	,	paths = require('app/appGlobals').paths
  , path = require('path')
	,	_ = require('lodash')
	,	ClientController = require(path.join(paths.controllersDir, 'client.controller'));

router
	.prefix('/clients')
	.get('/', ClientController.create);

module.exports = router;