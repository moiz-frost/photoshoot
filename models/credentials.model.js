var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var credentialsSchema = new Schema({
  id:  {
  	type: Schema.Types.ObjectId // ObjectId | Oid
  },
  username: {
  	type: String,
  	required: true,
  	lowercase: false,
    unique: true
  },
  password: {
  	type: String,
    maxlength: 100,
  	required: true,
  	lowercase: false
  },
  token: {
    type: String,
    required: false,
  }
});

var Credentials = module.exports = mongoose.model('Credentials', credentialsSchema);