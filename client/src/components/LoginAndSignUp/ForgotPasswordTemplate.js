import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SuccessSnackBar from "../snackBar/SuccessSnackBar";
// import userService from "../../services/UserService";
import CustomBackdrop from "../backdrop/CustomBackdrop";
import userService from "../../services/UserService";
import SnackBar from "../snackBar/SnackBar";
import { useSelector, useDispatch } from "react-redux";
// import CheckLogIn from "../../auth/CheckLogIn";
import { trueLogin } from "../../Redux/actions/LoginAction";
import { trueLoginGoogle } from "../../Redux/actions/GoogleLoginAction";
// import SnackBar from "../snackBar/SnackBar";
import RedirectToHome from "../../auth/RedirectToHome";
import GoogleLogin from "react-google-login";
import ReactFacebookLogin from "react-facebook-login";
import { Divider } from "@material-ui/core";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Trakouts
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ForgotPasswordTemplate = (props) => {
  const [pass, setPass] = React.useState("");
  React.useEffect(() => {
    console.log("====================================");

    console.log("HERE ARE THE THINGS");
    console.log(props.match.params.id);
    console.log(props.match.params.key);
    console.log("====================================");
    userService
      .forgetPasswordTemplate(props.match.params.id, props.match.params.key)
      .then((r) => {
        console.log("====================================");
        console.log(r);
        setPass(r);
        console.log("====================================");
      })
      .catch((e) => {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
      });
  }, []);
  return (
    <div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>
        {pass}{" "}
        HEllooooooooooofffffffffffffffffffffffffffffffffffffffffffffffffffffffo
      </div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
      <div>{pass} HElloooooooooooo</div>
    </div>
  );
};
export default ForgotPasswordTemplate;
