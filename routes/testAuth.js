var router = require('koa-router')()
	,	jwt = require('jsonwebtoken');

router.get('/auth', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

module.exports = router;