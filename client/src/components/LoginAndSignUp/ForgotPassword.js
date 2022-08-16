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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ForgotPassword = (props) => {
  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  console.log("redux is loggedin: " + isLoggedInRedux);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState("");
  const [loginProgress, setLoginProgress] = React.useState(false);
  const [img, setImg] = React.useState("");

  const classes = useStyles();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  // userService.isLoggedin()
  //   ? console.log("Yes logged in")
  //   : console.log("Not logged in");
  const [sucessOpen, setSucessOpen] = React.useState(false);

  const [sucessMsg, setSucessMsg] = React.useState("");
  const [btnEmailClicked, setBtnEmailClicked] = React.useState(false);
  console.log(useSelector((state) => state.login.email));
  function ValidateEmail(mail) {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    // alert("You have entered an invalid email address!");
    return false;
  }
  const handleLogin = () => {
    if (ValidateEmail(email)) {
      setLoginProgress(true);
      userService
        .forgetPassword({ email: email.toLowerCase(), password: password })
        .then(function (res) {
          setSucessOpen(true);
          setSucessMsg("Email sent to " + email.toLowerCase());
          // props.history.push("/");
          setLoginProgress(false);
          setBtnEmailClicked(true);
        })
        .catch(function (error) {
          setLoginProgress(false);
          console.log(error);
          setOpen(true);
          setmsg(error.response.data);
        });
    } else {
      setOpen(true);
      setmsg("Invalid email.");
    }
  };

  const handleFacebookLogin = (r) => {
    var temp = {};
    userService
      .UserSocialLogin({
        socialName: r.name,
        socialEmail: r.email,
        socialId: r.id,
        socialType: "Facebook",
      })
      .then((res) => {
        console.log(r);
        temp = r;
        var temp2 = { _id: res };
        temp._id = res;
        localStorage.setItem("facebook", JSON.stringify(temp));
        dispatch(trueLogin());
        props.history.push("/");
      })
      .catch((e) => {});
  };

  return (
    <RedirectToHome>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            {/* <Typography component="h1" variant="h5">
              or
            </Typography> */}
            <Typography component="h1" variant="h5">
              Forgot password
            </Typography>
            <img src={img} alt="" />
            <form className={classes.form}>
              <TextField
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <SuccessSnackBar
                open={sucessOpen}
                setOpen={setSucessOpen}
                msg={sucessMsg}
              />
              <SnackBar open={open} setOpen={setOpen} msg={msg} />

              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={btnEmailClicked}
                onClick={handleLogin}
              >
                Send email
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => {
                      props.history.push("/signin");
                    }}
                  >
                    Sign in?
                  </Link>
                </Grid>
              </Grid>
              <hr />

              {/* <CircularProgress color="secondary" />; */}
              <CustomBackdrop open={loginProgress} setOpen={setLoginProgress} />
              <br />

              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </RedirectToHome>
  );
};
export default ForgotPassword;
