// Just a testing route

var router = require('koa-router')()
	,	parse = require('co-body')
	,	paths = require('app/appGlobals').paths
	,	jwt = require(paths.jwt);

router
	.post('/auth', function *(next) {
		// this.body = JSON.stringify({
		// 	token: jwt.sign({ role: 'admin' }, '100% secret'),
		// 	message: 'Success'
		// });
		// this.body = JSON.stringify(this.request.fields);
		// console.log(this.session);
		// console.log(this.request);
		// console.log(Object.keys(this.request));
		// console.log(Object.keys(this.response));
		// console.log(Object.keys(this.request.fields));
		yield next;
});

module.exports = router;