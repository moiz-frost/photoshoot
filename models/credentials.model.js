var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentialsSchema = new Schema({
  id:  {
  	type: Schema.Types.ObjectId // ObjectId | Oid
  },
  username: {
  	type: String,
  	required: true,
  	lowercase: true
  },
  password: {
  	type: String,
  	required: true,
  	lowercase: true
  }
});

var Credentials = module.exports = mongoose.model('Credentials', credentialsSchema);