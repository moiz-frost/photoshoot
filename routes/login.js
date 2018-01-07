var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	var loginPage = fs.readFileSync('views/pages/login.ejs', 'utf8');
  res.render('layouts/pages', 
  	{ 
  		content: loginPage,
  		scripts: ['assets/js/login.js']
  	});
});

module.exports = router;