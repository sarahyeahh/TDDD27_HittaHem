//models/User.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs';

const userSchema = new Schema({
  email: { type: String, lowercase: true, unique: true},
  password: String,
  role: { type: Number, default: 0 },
  auth: {
    token: String,
    used: Boolean,
    expires: Date,
  },
 
});


userSchema.pre('save', function (next) {
  const user = this;

  console.log("Saved user: ")
  console.log(user)

  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }

      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      user.password = hash;
      user.auth = { token: salt, used: 0, expires: tomorrow };
      next();
    });
  });
});


userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {

    console.log("Userschema compare")

    if (err) { return callback(err); }

    callback(null, isMatch);
  });
};


userSchema.methods.generateHash = password => 
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);

userSchema.methods.validatePassword = function(password) { 
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);