var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	var registerPage = fs.readFileSync('views/pages/lock.ejs', 'utf8');
  res.render('layouts/pages', 
  	{ 
  		content: registerPage,
  		scripts: ['assets/js/lock.js']
  	});
});

module.exports = router;