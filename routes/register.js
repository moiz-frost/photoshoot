var router = require('koa-router')()
	,	paths = require('app/appGlobals').paths
  , path = require('path')
	,	_ = require('lodash')
	,	UserController = require(path.join(paths.controllersDir, 'user.controller'));

router
	.prefix('/register')
	.post('/', UserController.create)
	
	// .post('/findAll', UserController.findAll)
	// .post('/findOne', UserController.findOne);
	// .post('/findOneAndRemove', UserController.findOneAndRemove)
	// .post('/deletemany', UserController.deleteMany);

module.exports = router;