//models/Home.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const homeSchema = new Schema({
	user: String, 
  	title: String, 
  	type: String, 
  	image: String, 
  	size: Number, 
  	maxsize: Number, 
  	minsize: Number, 
  	rooms: Number, 
});

homeSchema.pre('save', function (next) {
  const home = this;

  console.log("Homeschema save")  
  next();

});

module.exports = mongoose.model('Home', homeSchema);