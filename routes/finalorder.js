var express = require("express");
var router = express.Router();
// const mongoose = require("mongoose");
var { FinalOrder } = require("../mongooseModels/model.finalorders");
var socketApi = require("../socketApi");
var io = socketApi.io;
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
router.post("/finalorder/:c_id/:files_id", async (req, res) => {
  // C_Id: "",
  // F_Id: "",
  // service_Category: {},
  // total_price: "",
  // time: "",
  console.log("====================================");
  console.log(req.body.time);
  console.log(req.body.date);
  console.log("====================================");
  let c_id = req.params.c_id;
  let o_id = req.params.files_id;

  let finalOrder = new FinalOrder();
  finalOrder.C_Id = c_id;
  finalOrder.F_Id = o_id;
  finalOrder.service_Category = req.body.category;
  finalOrder.comments = req.body.additionalText;
  finalOrder.orderCreatedTime = req.body.time;
  finalOrder.orderCreatedDate = req.body.date;
  await finalOrder.save();
  return res.send();
});
io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log(data);
    socket.broadcast.emit("client", data);
    return;
  });
});
module.exports = router;
