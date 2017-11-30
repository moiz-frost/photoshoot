var router = require('koa-router')();

router
	.prefix('/users')
	.get('/', function *(next) {
  this.body = 'this is a users response!';
	yield next;
})
	.get('/bar', function *(next) {
  this.body = 'this is a users/bar response!';
	yield next;
});

module.exports = router;