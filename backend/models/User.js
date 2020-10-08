const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstname:{ type: String, required: true },
  lastname:{ type: String, required: true },
  sex: { type: String, required: true },
  birthday:{ type: Date, required: true },
  phone:{ type: String, required: false },
  isPremium :{ type: Boolean, required: true },
  password: { type: String, required: true },
  bio: { type: String, required: false },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);