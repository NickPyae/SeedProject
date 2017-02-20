var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    email: {type: String, lowercase: true, required: true, unique: true},
    password: {type: String, required: true},
    role: {
      type: String,
      enum: ['Client', 'Manager', 'Admin'],
      default: 'Client'
    },
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// sets created_at, updated_at equal to the current time and password to be hashed 
userSchema.pre('save', function(next) {
  var now = new Date();
  var user = this;

  if(!this.createdAt) {
    this.created_at = now;
    this.updated_at = now;
  }

  if(this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
        if(err) {
          return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
              return next(err);
            } 

            user.password = hash;
            next();
        });
    });
  } else {
    return next();
  }
});

// compare password
userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if(err) {
      return callback(err);
    }

    return callback(null, isMatch);
  });
};

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);