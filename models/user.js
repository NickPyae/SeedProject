let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let mongooseUniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
});

// Sets created_at and updated_at parameters equal to the current time
userSchema.pre('save', (next) => {
  let now = new Date();

  if(!this.createdAt) {
    this.created_at = now;
    this.updated_at = now;
  }

  next();
});

userSchema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', userSchema);