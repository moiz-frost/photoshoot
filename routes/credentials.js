var router = require('koa-router')()
	,	paths = require('app/appGlobals').paths
  , path = require('path')
	,	_ = require('lodash')
	,	CredentialController = require(path.join(paths.controllersDir, 'auth/credential.controller'));

router
	.prefix('/credentials')
	.post('/create', CredentialController.create)
	.post('/findAll', CredentialController.findAll)
	.post('/findOne', CredentialController.findOne)
	.post('/findOneAndRemove', CredentialController.findOneAndRemove)
	.post('/deletemany', CredentialController.deleteMany);

module.exports = router;