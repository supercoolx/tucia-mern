var { validateUser } = require("../mongooseModels/model.users");
var _ = require("lodash");
function validateUserRegMW(req, res, next) {
  console.log("In validate");
  let user = validateUser(
    _.pick(req.body, ["email", "fname", "lname", "password"])
  );
  console.log(user);
  if (user.error) {
    let test = "";
    for (let i = 0; i < user.error.details.length; i++) {
      test = test + user.error.details[i].message;
      test = test + " ";
    }
    return res.status(400).send(test);
  }
  next();
}
module.exports = validateUserRegMW;
