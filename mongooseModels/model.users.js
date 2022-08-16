var mongoose = require("mongoose");
const Joi = require("@hapi/joi"); //for validating data in mongoose
// const { bool, boolean } = require("@hapi/joi");

var userSchema = mongoose.Schema({
  fname: String,
  lname: String,
  email: String,
  password: String,
  socialId: String,
  socialType: { type: String, default: "no" },
  role: { type: Boolean, default: false },
  forgetConfirmation: String,
});
var User = mongoose.model("users", userSchema);

function validateUser(data) {
  const schema = Joi.object({
    fname: Joi.string().min(3).required(),
    lname: Joi.string().min(3).required(),
    email: Joi.string().email().min(3).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data, { abortEarly: false });
}
function validateUserLogin(data) {
  const schema = Joi.object({
    email: Joi.string().email().min(3).required(),
    password: Joi.required(),
  });
  return schema.validate(data, { abortEarly: false });
}

module.exports.User = User;
module.exports.validateUser = validateUser;
module.exports.validateUserLogin = validateUserLogin;
