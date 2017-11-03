var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedback = require(__dirname + '/feedback');

var clientSchema = new Schema({
  id:  {
  	type: ObjectId // ObjectId | Oid
  },
  name: {
  	type: String,
  	required: true,
  	lowercase: true
  },
  organization: {
  	type: String,
  	required: true,
  	lowercase: true
  }
  rating: { // 1 - 5
  	type: Number,
  	min: 1,
  	max: 5
  },
  age: {
  	type: Number,
  	min: 18
  },
  join_date: {
  	type: Date,
  	default: Date.now 
 	},
  feedback: [feedback.schema]
});

var Client = module.exports = mongoose.model('Client', clientSchema);