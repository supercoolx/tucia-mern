var express = require("express");
var router = express.Router();
var { User } = require("../mongooseModels/model.users");
const { mongo } = require("mongoose");
var bcrypt = require("bcryptjs");
var config = require("config");
var _ = require("lodash");
var jwt = require("jsonwebtoken");
var validateUserRegMW = require("../middlewares/authUserReg");
var validateUserLoginMW = require("../middlewares/authUserLog");
const nodemailer = require("nodemailer");
var generator = require("generate-password");
router.get("/", async (req, res, next) => {
  let user = await User.find();
  res.send(user[0]._id);
});

router.post("/register", validateUserRegMW, async (req, res) => {
  let newuser = await User.findOne({ email: req.body.email });
  if (newuser != null)
    return res.status(400).send("Sorry, user already exists.");
  newuser = new User();
  newuser.fname = req.body.fname;
  newuser.lname = req.body.lname;
  newuser.email = req.body.email;
  newuser.password = req.body.password;
  let salt = await bcrypt.genSalt(10);
  newuser.password = await bcrypt.hash(newuser.password, salt);
  await newuser.save();
  let token = jwt.sign(
    {
      _id: newuser._id,
      name: newuser.fname,
      role: newuser.role,
      email: newuser.email,
      socialType: newuser.socialType,
    },
    config.get("jwt")
  );

  let user2 = jwt.verify(token, config.get("jwt"));
  return res.send({ ok: "login successfull", token, user2 });
  // return res.send(_.pick(user, ["email", "name"]));
});
router.post("/login", validateUserLoginMW, async (req, res) => {
  let userData = await User.findOne({
    email: req.body.email,
    socialType: "no",
  });
  if (!userData)
    return res.status(400).send("Sorry, user with this email not found.");

  let password = await bcrypt.compare(req.body.password, userData.password);
  if (!password) return res.status(400).send("Wrong password");

  let token = jwt.sign(
    {
      _id: userData._id,
      name: userData.fname,
      role: userData.role,
      email: userData.email,
      socialType: userData.socialType,
    },
    config.get("jwt")
  );

  let user2 = jwt.verify(token, config.get("jwt"));
  return res.send({ ok: "login successfull", token, user2 });
});
router.post("/login/social", async (req, res) => {
  let newuser = await User.findOne({ socialId: req.body.socialId });
  if (newuser != null) return res.status(200).send(newuser._id);
  newuser = new User();
  newuser.fname = req.body.socialName;
  // newuser.lname = req.body.lname;
  newuser.email = req.body.socialEmail;
  newuser.socialId = req.body.socialId;
  newuser.socialType = req.body.socialType;
  // let salt = await bcrypt.genSalt(10);
  // newuser.password = await bcrypt.hash(newuser.password, salt);
  await newuser.save();
  return res.status(200).send(newuser._id);
  // return res.send(_.pick(user, ["email", "name"]));
});

//sends all users to show on a table
//@ users/allusers
router.get("/allusers", async (req, res) => {
  let user = await User.find();
  if (!user) return res.status(400).send("Sorry, no user found!");
  return res.send(user);
});
//updates the role from the user data table on client side
//@ users/update
router.post("/update", async (req, res) => {
  let user = await User.findById(req.body._id);
  if (!user) return res.status(400).send("Sorry, no user found!");
  user.role = req.body.role;
  await user.save();
  return res.send();
});
//this route is to send user account details on the edit user details page
//@ /users/details/id
router.get("/details/:id", async (req, res) => {
  let id = req.params.id;
  let user = await User.findById(id);
  if (!user) return res.status(400).send("Sorry, no user found!");
  return res.send(_.pick(user, ["email", "fname", "lname"]));
});
//this route is to update user account details on the edit user details page
//@ POST /users/details/id
router.post("/details/:id", async (req, res) => {
  let id = req.params.id;
  if (req.body.password.length > 4) {
    if (req.body.password === req.body.newPassword) {
      return res.status(400).send("Passwords should be different.");
    } else if (req.body.newPassword.length < 5) {
      return res
        .status(400)
        .send("New password's length should be greater than 4.");
    }
  } else if (req.body.password.length > 1) {
    return res
      .status(400)
      .send("New password's length should be greater than 4.");
  } else if (req.body.password.length > 1) {
    return res
      .status(400)
      .send("New password's length should be greater than 4.");
  }

  let user = await User.findById(id);
  if (!user) return res.status(400).send("Sorry, no user found!");
  if (req.body.password.length > 4) {
    let password = await bcrypt.compare(req.body.password, user.password);
    if (!password) return res.status(400).send("Wrong old password");

    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.newPassword, salt);
  }
  user.fname = req.body.fname;
  user.lname = req.body.lname;
  user.email = req.body.email;
  await user.save();
  return res.status(200).send("Password successfully changed!");
});

router.post("/forgetPassword", async (req, res) => {
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

// confirmEmail/${id}/${key}
//when user clicks the link in mail
router.get("/confirmEmail/:id/:key", async (req, res) => {
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
  return res.send(new_password);
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

//   var password = generator.generate({
//     length: 10,
//     numbers: true,
//   });

//   console.log(password);

//   console.log(req.body.email);
//   await sendMail(req.body.email, password);
//   return res.send();
// });

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
    )}/users/confirmEmail/${id}/${key}>Click this link to confirm and to Redirect to a new page</a></b></div>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// async function sendMail(r_email, r_newpassword) {
//   // Generate test SMTP service account from ethereal.email
//   // Only needed if you don't have a real mail account for testing
//   let testAccount = await nodemailer.createTestAccount();

//   // create reusable transporter object using the default SMTP transport
//   let transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "trakouts@gmail.com",
//       pass: "fiverr123!",
//     },
//   });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: "trakouts@gmail.com", // sender address
//     to: "arqam.android@gmail.com", // list of receivers
//     subject: "Hello This is a TEST for password recovery✔", // Subject line
//     text: `Hello ${r_email}, Your new trakouts password is ${r_newpassword}`, // plain text body
//     html: `<b>Hello ${r_email}, Your new trakouts password is ${r_newpassword}</b>`, // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//   // Preview only available when sending through an Ethereal account
//   console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
// }

module.exports = router;
