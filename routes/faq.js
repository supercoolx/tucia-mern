var express = require("express");
var router = express.Router();
var { FaqTopics } = require("../mongooseModels/model.faqTopics");
var { FaqArticle } = require("../mongooseModels/model.faqArticles");
const { mongo } = require("mongoose");
var bcrypt = require("bcryptjs");
var config = require("config");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var validateUserRegMW = require("../middlewares/authUserReg");
var validateUserLoginMW = require("../middlewares/authUserLog");
const nodemailer = require("nodemailer");
var generator = require("generate-password");
const { array } = require("@hapi/joi");

router.get("/", async (req, res, next) => {
  return res.send("FAQ");
});
router.post("/newTopic", async (req, res, next) => {
  try {
    let available = await FaqTopics.find({ topicName: req.body.topic });
    if (available.length > 0)
      return res.status(400).send(req.body.topic + ", already exists.");
    let faqTopic = new FaqTopics();
    faqTopic.topicName = req.body.topic;
    await faqTopic.save();
  } catch (error) {
    return res.status(400).send("Error at server, IN CATCH");
  }
  return res.status(200).send("POST: New Topic FAQ");
});
router.get("/allTopicsArray", async (req, res, next) => {
  let faqTopic = [];
  try {
    faqTopic = await FaqTopics.find().select({ topicName: 1, _id: 0 });
    // faqTopic = await FaqTopics.find().select("topicName -_id");
  } catch (error) {
    return res.status(400).send("Error at server");
  }
  return res.status(200).send(faqTopic);
});
router.post("/newFAQ", async (req, res, next) => {
  let topic = null;
  let article = null;

  try {
    topic = await FaqTopics.findOne({ topicName: req.body.topicName });
    if (!topic) return res.status(400).send("Topic not found");

    article = new FaqArticle();
    article.articleName = req.body.articleName;
    article.articleHTML = req.body.articleDesc;

    topic.articles_id.push(article._id);
  } catch (error) {
    return res.status(400).send("Error at server");
  }
  await article.save();
  await topic.save();
  return res.status(200).send("New FAQ saved");
});
router.get("/getAllTopics", async (req, res, next) => {
  let topic = null;
  try {
    topic = await FaqTopics.find();
  } catch (error) {
    return res.status(400).send("Error at server");
  }

  return res.status(200).send(topic);
});

router.get("/getAllArticles/:id", async (req, res, next) => {
  let topics = null;
  let articles = [];
  // try {
  topics = await FaqTopics.findById(req.params.id);
  if (!topics) return res.status(400).send("Error at server. topic not found");

  for (let i = 0; i < topics.articles_id.length; i++) {
    let temp = await FaqArticle.findById(topics.articles_id[i]);
    let obj = {
      articleName: temp.articleName,
      articleHTML: temp.articleHTML,
    };
    articles.push(obj);
  }
  // } catch (error) {
  //   return res.status(400).send("Error at server");
  // }

  return res.status(200).send(articles);
});

module.exports = router;
