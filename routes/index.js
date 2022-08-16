var express = require("express");
var router = express.Router();

const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");

/* GET home page. */

// const mongoURI = "mongodb://localhost/mongouploads";

// const conn = mongoose.createConnection(mongoURI);

// let gfs;

// conn.once("open", () => {
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("uploads");
// });

// //create storge engine
// const storage = new GridFsStorage({
//   url: mongoURI,
//   file: (req, file) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if (err) {
//           return reject(err);
//         }
//         const filename = buf.toString("hex") + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           bucketName: "uploads",
//         };
//         resolve(fileInfo);
//       });
//     });
//   },
// });
// const upload = multer({ storage });

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// router.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ file: req.file });
//   console.log("hello indexxx");
//   console.log(req.file);
// });

module.exports = router;
