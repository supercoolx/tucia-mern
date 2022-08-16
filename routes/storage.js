var express = require("express");
var router = express.Router();

const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const { FinalOrder } = require("../mongooseModels/model.finalorders");
const { Order } = require("../mongooseModels/model.orders");

router.get("/", function (req, res, next) {
  return res.send("Storage");
});

const development = "mongodb://localhost/";
const production = "mongodb://localhost:27017/";

const mongoURI = production + "trakouts";

// mongoose
//   .connect("mongodb://localhost/mongouploads2", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to mongoDB");
//   })
//   .catch((err) => {
//     console.log(err);
//     console.log("ERROR. In catch block of mongoose connection.");
//   });

const conn = mongoose.createConnection(mongoURI);
// const conn = mongoose.connection;

let gfs;

conn.once("open", () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//create storge engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        // const filename = buf.toString("hex") + path.extname(file.originalname);
        const filename = Date.now() + "_" + file.originalname;
        const _id = file._id;
        const fileInfo = {
          filename: filename,
          _id: _id,
          // c_id: "1w22w23312",
          bucketName: "uploads",
        };
        resolve(fileInfo);
      });
    });
  },
});
const upload = multer({ storage });
//upload.single("file")
router.post("/upload/:id/:file_id", upload.array("file"), async (req, res) => {
  // console.log(req);
  // res.json({ file: req.file });

  // let files_id = "";
  let files_id = req.params.file_id;
  console.log("Files_id:" + files_id);
  let order = null;
  if (files_id === "null") {
    order = new Order();
  } else {
    order = await Order.findById(files_id);
  }
  // order = new Order();
  for (let i = 0; i < req.files.length; i++) {
    order.uploads_Id.push(req.files[i].filename);
  }
  order.customer_Id = req.params.id;

  await order.save();
  console.log("Customer ID: " + req.params.id);
  console.log("hello i  up");
  console.log(req.files);
  return res.send(order._id);
});
function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

//for admin, when the order is completed and the edited files aree sent.
router.post(
  "/upload/admin/:id/:file_id/:status",
  upload.array("file"),
  async (req, res) => {
    let files_id = req.params.file_id;
    console.log("Files_id:" + files_id);
    let order = null;
    if (files_id === "null") {
      order = new Order();
    } else {
      order = await Order.findById(files_id);
    }
    // order = new Order();
    for (let i = 0; i < req.files.length; i++) {
      order.uploads_Id.push(req.files[i].filename);
    }
    // order.customer_Id = req.params.id;

    await order.save();

    let finalorder = await FinalOrder.findById(req.params.id);
    if (!finalorder) return res.status(400).send("FinalOrder Model not found!");

    finalorder.completed_fileID = order._id;
    finalorder.status = req.params.status;
    finalorder.orderCompletedTime = formatAMPM(new Date());
    finalorder.orderCompletedDate =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear();

    await finalorder.save();

    console.log("Customer ID: " + req.params.id);
    console.log("hello i  up");
    console.log(req.files);
    return res.send(order._id);
  }
);
router.get("/allorder/finalorder", async (req, res) => {
  let allorders = await FinalOrder.find();
  console.log("hello g allorder");
  return res.send(allorders);
});
router.get("/allfiles/:id", async (req, res) => {
  let filesId = req.params.id;

  let order = await Order.findById(filesId);
  for (let index = 0; index < order.uploads_Id.length; index++) {
    console.log(order.uploads_Id[index] + "hello ");
  }

  console.log("hello g allorder");
  return res.send(order);
});

//this is for getting user files when user slides the order.
router.get("/allorder/user/:id", async (req, res) => {
  console.log("In");
  let userID = req.params.id;

  let order = await FinalOrder.find({ C_Id: req.params.id });
  if (!order)
    return res
      .status(400)
      .send("Files not found against user Order " + req.params.id);

  // console.log(order[0].completed_fileID);

  // let files = await Order.findById(order[0].completed_fileID);
  // if (!files)
  //   return res
  //     .status(400)
  //     .send("Files not found against user Files " + req.params.id);
  // console.log(files);

  return res.send(order);
});

// this sends the downloadable links to the client
router.get("/allfilesDownload/:id", async (req, res) => {
  let filesId = req.params.id;
  let order = await Order.findById(filesId);

  // console.log(order.uploads_Id[0] + " hello");
  // order.uploads_Id.map((item, index) => {
  //   gfs.files.findOne({ filename: item }, (err, file) => {
  //     if (!file || file.length === 0) {
  //       console.log("no files");
  //       return res.status(404).json({
  //         err: "No single file exists",
  //       });
  //     }
  //     const readstream = gfs.createReadStream(file.filename);
  //     readstream.pipe(res);
  //   });
  // });
  // console.log("hello g allorder");
  return res.status(200).send({ data: order.uploads_Id });
});
router.get("/files", (req, res) => {
  console.log("no files");
  // return res.send("files");
  gfs.files.find().toArray((err, files) => {
    // if files exists
    console.log(files);
    if (!files || files.length === 0) {
      console.log("no files");
      return res.status(404).json({
        err: "No files exists",
      });
    }

    //files exists

    return res.json(files);
  });
  // console.log("hello g");
  // return res.send("hello");
});
//displ;ay simgle file
router.get("/files/:filename", (req, res) => {
  console.log("no files");
  // return res.send("files");
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      console.log("no files");
      return res.status(404).json({
        err: "No single file exists",
      });
    }

    //file exist
    return res.json(file);
  });
  // console.log("hello g");
  // return res.send("hello");
});
router.get("/delete/finalorder/:id", async (req, res) => {
  try {
    let order = await FinalOrder.findById(req.params.id);
    if (!order)
      return res.status(400).send("There was an error deleing this order!");
    await FinalOrder.deleteOne({ _id: req.params.id });
    res.send("Order deleted successfully");
  } catch (err) {
    return res.status(400).send("There was an error deleing this order!");
  }
});

//get display image
router.get("/image/:filename", (req, res) => {
  console.log("no files");
  // return res.send("files");
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      console.log("no files");
      return res.status(404).json({
        err: "No single file exists",
      });
    }

    //check if image
    // if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
    //read output to broswer

    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    // } else {
    // res.status(404).json({ err: "Not an image" });
    // }
    //file exist
    // return res.json(file);
  });
  // console.log("hello g");
  // return res.send("hello");
});
router.get("/down/:filename", (req, res) => {
  // console.log("no files");
  // return res.send("files");
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    if (!file || file.length === 0) {
      console.log("no files");
      return res.status(404).json({
        err: "No single file exists",
      });
    }

    //check if image
    // if (file.contentType === "image/jpeg" || file.contentType === "img/png") {
    //read output to broswer
    // console.log(file, _id);
    const readstream = gfs.createReadStream(file.filename);
    readstream.pipe(res);
    // } else {
    // res.status(404).json({ err: "Not an image" });
    // }
    //file exist

    // return res.json(file);
  });
  // return res.redirect(
  //   "http://localhost:4000/down/567470fd1e7311c6163d6dfc87df8400.mp4"
  // );
  // console.log("hello g");
  // return res.send("hello");
});
// router.get("/todown/:filename", (req, res) => {
//   return res.redirect("/down/567470fd1e7311c6163d6dfc87df8400.mp4");
// });

module.exports = router;
