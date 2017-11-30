var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedback = require(__dirname + '/feedback.model');

var photographerSchema = new Schema({
  id:  {
  	type: Schema.Types.ObjectId // ObjectId | Oid
  },
  name: {
  	type; String,
  	required: true,
  	lowercase: true
  },
  work_experience: {
    required: true,
    type: Number
  },
  biography: {
    type: String
  },
  Expertise: {
    required: true,
    type: String
  },
  rating: { // 1 - 5
  	type: Number,
  	min: 1,
  	max: 5
  },
  age: {
    required: true,
  	type: Number,
  	min: 18
  },
  join_date: {
    required: true,
  	type: Date,
  	default: Date.now 
 	},
  feedback: [feedback.schema]
});

var Photographer = module.exports = mongoose.model('Photographer', photographerSchema);