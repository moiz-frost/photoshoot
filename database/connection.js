var mongoose = module.exports = require('mongoose');

// use node's native Promise library
mongoose.Promise = global.Promise;

// database connection
mongoose.connect('mongodb://admin:admin@ds241055.mlab.com:41055/photoshoot', {
  useMongoClient: true
}).then(function (db){
  // console.log(db);
});