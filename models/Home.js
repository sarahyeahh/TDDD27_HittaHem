//models/Home.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const homeSchema = new Schema({
	user: String, 
  	title: String, 
  	type: String, 
  	image: String, 
  	size: Number, 
  	rooms: Number, 
});

homeSchema.pre('save', function (next) {
  const home = this;
  console.log("Saved Home \n")  
  next();
});

module.exports = mongoose.model('Home', homeSchema);