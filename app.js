var createError = require("http-errors");
var express = require("express");
var path = require("path");
const nodemailer = require("nodemailer");
var generator = require("generate-password");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var config = require("config");
var cors = require("cors");
var bcrypt = require("bcryptjs");
var { Order } = require("./mongooseModels/model.orders");
var { FinalOrder } = require("./mongooseModels/model.finalorders");
const corsOptions = {
  //these are the headres allowed
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Accept",
    "X-Access-Token",
    "Authorization",
    "x-auth-token", //this header is sent by react if user is logged in
  ],
  credentials: true,
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  //origin: "http://ec2-18-224-94-239.us-east-2.compute.amazonaws.com",
  // origin: "http://ec2-3-135-218-85.us-east-2.compute.amazonaws.com",
  origin: "http://localhost:3000",
  // origin: "https://trakouts.com",
  preflightContinue: false,
};
var app = express();
app.post("/forgetPassword", async (req, res) => {
  // console.log(req.params.id);
  console.log(req.body.email + "hello");
  let user = await User.findOne({ email: req.body.email, socialType: "no" });
  if (!user)
    return res.status(400).send("Sorry no account found with this email.");
  console.log(user);
  let id = user._id;
  // let user = await User.findById(req.params.id);
  // if (!user) res.status(400).send("User does not exists!");

  var password = generator.generate({
    length: 10,
    numbers: true,
  });

  user.forgetConfirmation = password;
  await user.save();

  console.log(password);

  console.log(req.body.email);
  await sendConfirmationMail(req.body.email, password, id);
  // await sendMail(req.body.email, password);
  return res.status(200).send();
});
app.get("/confirmEmail/:id/:key", async (req, res) => {
  console.log(req.params.id);
  console.log(req.params.key);
  let key = req.params.key;
  let user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("user not found!");
  var new_password = "";

  console.log(user.forgetConfirmation);
  if (user.forgetConfirmation == key) {
    new_password = generator.generate({
      length: 10,
      numbers: true,
    });
    user.password = new_password;
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(new_password, salt);
    await user.save();
  } else {
    return res.status(400).send("Invalid Link!");
  }
  console.log("YESSSS");
  // return res.send(new_password);
  return res.send(`<!DOCTYPE html>
  <html>
  <head>
  
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Password Reset</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
    /**
     * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
     */
    @media screen {
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 400;
        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
      }
  
      @font-face {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
      }
    }
  
    /**
     * Avoid browser level font resizing.
     * 1. Windows Mobile
     * 2. iOS / OSX
     */
    body,
    table,
    td,
    a {
      -ms-text-size-adjust: 100%; /* 1 */
      -webkit-text-size-adjust: 100%; /* 2 */
    }
  
    /**
     * Remove extra space added to tables and cells in Outlook.
     */
    table,
    td {
      mso-table-rspace: 0pt;
      mso-table-lspace: 0pt;
    }
  
    /**
     * Better fluid images in Internet Explorer.
     */
    img {
      -ms-interpolation-mode: bicubic;
    }
  
    /**
     * Remove blue links for iOS devices.
     */
    a[x-apple-data-detectors] {
      font-family: inherit !important;
      font-size: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
      color: inherit !important;
      text-decoration: none !important;
    }
  
    /**
     * Fix centering issues in Android 4.4.
     */
    div[style*="margin: 16px 0;"] {
      margin: 0 !important;
    }
  
    body {
      width: 100% !important;
      height: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
  
    /**
     * Collapse table borders to avoid space between cells.
     */
    table {
      border-collapse: collapse !important;
    }
  
    a {
      color: #1a82e2;
    }
  
    img {
      height: auto;
      line-height: 100%;
      text-decoration: none;
      border: 0;
      outline: none;
    }
    </style>
  
  </head>
  <body style="background-color: #e9ecef;">
  
    <!-- start preheader -->
    <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
      A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
    </div>
    <!-- end preheader -->
  
    <!-- start body -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
  
      <!-- start logo -->
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="center" valign="top" style="padding: 36px 24px;">
                
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end logo -->
  
      <!-- start hero -->
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Your New Passoword is ${new_password}</h1>
              </td>
            </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end hero -->
  
      <!-- start copy block -->
      <tr>
        <td align="center" bgcolor="#e9ecef">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
  
            <!-- start copy -->
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                <p style="margin: 0;">Tap the button below to Login again with your new passoword and you can change it anytime.</p>
              </td>
            </tr>
            <!-- end copy -->
  
            <!-- start button -->
            <tr>
              <td align="left" bgcolor="#ffffff">
                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                  <tr>
                    <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                      <table border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                            <a href="https://trakouts.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Click to Login again at trackouts.com</a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <!-- end button -->
  
            <!-- start copy -->
            
            <!-- end copy -->
  
            <!-- start copy -->
            <tr>
              <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                <p>You can screenshot it.</p>
                  <p style="margin: 0;">Cheers,<br> Trakouts</p>
              </td>
            </tr>
            <!-- end copy -->
  
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
        </td>
      </tr>
      <!-- end copy block -->
  
      <!-- start footer -->
      
      <!-- end footer -->
  
    </table>
    <!-- end body -->
  
  </body>
  </html`);
});
// router.get("/forgetPassword/emailconfirm/:id", async (req, res) => {
//   console.log(req.params.id);
async function sendConfirmationMail(r_email, key, id) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: `${config.get("trakoutsGmail")}`,
      pass: `${config.get("trakoutsGmailPassword")}`,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "trakouts@gmail.com", // sender address
    to: r_email, // list of receivers
    subject: "Recovery for trakouts login passoword", // Subject line
    text: `Hello ${r_email}, Your new trakouts password is `, // plain text body
    html: `<div><p>Ignore this email if you have not applied for password recovery for trakouts.</p><b><a href=${config.get(
      "base"
    )}/confirmEmail/${id}/${key}>Click this link to confirm and to Redirect to a new page</a></b></div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
app.get("/google4fffefe23182bc58.html", async (req, res) => {
  return res.send(`google-site-verification: google4fffefe23182bc58.html`);
});

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var storageRouter = require("./routes/storage");
var finalOrderRouter = require("./routes/finalorder");
var faqRouter = require("./routes/faq");
//
//const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
//

app.use(cors(corsOptions));
const methodOverride = require("method-override");
const { User } = require("./mongooseModels/model.users");
app.use(methodOverride("_method"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/faq", faqRouter);
app.use("/order", finalOrderRouter);
app.use("/storage", storageRouter);

app.use(express.static(path.join(__dirname, "client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

mongoose
  .connect("mongodb://localhost:27017/" + "trakouts", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch((err) => {
    console.log(err);
    console.log("ERROR. In catch block of mongoose connection.");
  });
module.exports = app;
