var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	var registerPage = fs.readFileSync('views/pages/register.ejs', 'utf8');
  res.render('layouts/pages', 
  	{ 
  		content: registerPage,
  		scripts: ['assets/js/register.js']
  	});
});

module.exports = router;