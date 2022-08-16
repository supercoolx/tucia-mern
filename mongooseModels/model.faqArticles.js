var mongoose = require("mongoose");
const Joi = require("@hapi/joi"); //for validating data in mongoose

var FaqArticleSchema = mongoose.Schema({
  articleName: String,
  articleHTML: String,
});
var FaqArticle = mongoose.model("faqArticles", FaqArticleSchema);

// function validateProduct(data) {
//   const schema = Joi.object({
//     name: Joi.string().min(3).max(100).required(),
//     price: Joi.number().min(0).required(),
//   });
//   return schema.validate(data, { abortEarly: false });
// }

module.exports.FaqArticle = FaqArticle;
// module.exports.validate = validateProduct;
