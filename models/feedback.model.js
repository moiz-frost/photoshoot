var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
  id:  {
  	type: Schema.Types.ObjectId // ObjectId | Oid
  },
  comment: {
  	type: String,
  	required: true,
  	lowercase: true
  },
  likes: { // 1 - 5
  	type: Number
  }
});

module.exports = {
  schema: feedbackSchema,
  instance: mongoose.model('Feedback', feedbackSchema)
} 

