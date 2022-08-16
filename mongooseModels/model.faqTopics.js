var mongoose = require("mongoose");
const Joi = require("@hapi/joi"); //for validating data in mongoose

var faqTopicSchema = mongoose.Schema({
  topicName: String,
  Description: String,
  articles_id: [],
});
var FaqTopics = mongoose.model("faqTopics", faqTopicSchema);

// function validateProduct(data) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(100).required(),
//     price: Joi.number().min(0).required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// }

module.exports.FaqTopics = FaqTopics;
// module.exports.validate = validateProduct;
