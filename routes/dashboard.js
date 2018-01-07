var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
	var dashboard = fs.readFileSync('views/layouts/dashboard.ejs', 'utf8');
  res.render('layouts/dashboard', 
  	{ 
  		// content: dashboard,
  		// scripts: ['assets/js/register.js']
  	});
});

module.exports = router;