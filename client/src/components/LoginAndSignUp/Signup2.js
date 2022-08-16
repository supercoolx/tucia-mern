import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import { useSelector, useDispatch } from "react-redux";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import GoogleLogin from "react-google-login";
import ReactFacebookLogin from "react-facebook-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { trueLogin } from "../../Redux/actions/LoginAction";
import SuccessSnackBar from "../snackBar/SuccessSnackBar";
// import userService from "../../services/UserService";
import CustomBackdrop from "../backdrop/CustomBackdrop";
import userService from "../../services/UserService";
import SnackBar from "../snackBar/SnackBar";
import RedirectToHome from "../../auth/RedirectToHome";
// import { useSelector, useDispatch } from "react-redux";
// import CheckLogIn from "../../auth/CheckLogIn";
// import { trueLogin } from "../../Redux/actions/LoginAction";
// import SnackBar from "../snackBar/SnackBar";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.instagram.com/arqamshakeel/">
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

const Signup2 = (props) => {
  // const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  // console.log("redux is loggedin: " + isLoggedInRedux);
  // const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [msg, setmsg] = React.useState("");
  const [loginProgress, setLoginProgress] = React.useState(false);

  const classes = useStyles();
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [sucessOpen, setSucessOpen] = React.useState(false);
  const dispatch = useDispatch();

  const [sucessMsg, setSucessMsg] = React.useState("");
  const handleLogin = () => {
    setLoginProgress(true);
    userService
      .UserReg({
        email: email.toLowerCase(),
        password: password,
        fname: fname,
        lname: lname,
      })
      .then(function (res) {
        setSucessOpen(true);
        setSucessMsg("Account successfully created");
        localStorage.setItem("token", res.token);
        props.history.push("/");
        setLoginProgress(false);
      })
      .then(() => {
        userService.isLoggedin()
          ? dispatch(trueLogin())
          : console.log("Not logged in");
      })
      .catch(function (error) {
        setLoginProgress(false);
        // setOpen(true);
        // if (error.response) {
        //   setmsg(error.response.data);
        // }
      });
  };
  const handleGoogleLogin = (r) => {
    // console.log("====================================");
    console.log(r.profileObj);

    // dispatch(
    //   trueLoginGoogle({
    //     name: r.profileObj.name,
    //     email: r.profileObj.email,
    //     imageurl: r.profileObj.imageurl,
    //   })
    // );
    var temp = {};
    userService
      .UserSocialLogin({
        socialName: r.profileObj.name,
        socialEmail: r.profileObj.email,
        socialId: r.profileObj.googleId,
        socialType: "Google",
      })
      .then((res) => {
        // console.log("====================================");
        console.log(r);
        temp = r.profileObj;
        var temp2 = { _id: res };
        // temp.push({ _id: r });
        temp._id = res;
        // var temp3 =   temp2 + tekmp;
        localStorage.setItem("google", JSON.stringify(temp));
        dispatch(trueLogin());
        props.history.push("/");
        // console.log("====================================");
      })
      .catch((e) => {
        // console.log("====================================");
        console.log(e);
        // console.log("====================================");
      });
  };
  const handleErrorGoogleLogin = (r) => {
    // console.log("====================================");
    console.log(r);
    // console.log("====================================");
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
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <SuccessSnackBar
              open={sucessOpen}
              setOpen={setSucessOpen}
              msg={sucessMsg}
            />
            <form className={classes.form}>
              <TextField
                value={fname}
                onChange={(e) => {
                  setFname(e.target.value);
                }}
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="First name"
                name="email"
                autoComplete="name"
                autoFocus
              />
              <TextField
                value={lname}
                onChange={(e) => {
                  setLname(e.target.value);
                }}
                variant="filled"
                margin="normal"
                required
                fullWidth
                label="Last name"
                name="email"
                autoComplete="lname"
                autoFocus
              />
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
              <SnackBar open={open} setOpen={setOpen} msg={msg} />
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleLogin}
              >
                Sign up
              </Button>
              {/* <CircularProgress color="secondary" />; */}
              <CustomBackdrop open={loginProgress} setOpen={setLoginProgress} />
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
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <hr />
              <Grid container justify="center">
                <Grid item xs={2}></Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <GoogleLogin
                      clientId="979963542445-vuvcfpt5nujiv07t47oigka3ak6ghghm.apps.googleusercontent.com"
                      buttonText="Login"
                      onSuccess={handleGoogleLogin}
                      onFailure={handleErrorGoogleLogin}
                      cookiePolicy={"single_host_origin"}
                      theme="dark"
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography>or</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <ReactFacebookLogin
                      appId="685422652363605"
                      // autoLoad={true}
                      fields="name,email,picture"
                      onClick={(r) => {
                        console.log(r);
                      }}
                      callback={handleFacebookLogin}
                      // cssClass="[1]"
                      icon="fa-facebook"
                      size="small"
                      textButton="Login"
                      // isMobile={true}
                    />
                  </Box>
                </Grid>
              </Grid>
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
export default Signup2;
