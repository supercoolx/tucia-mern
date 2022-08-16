import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
//import AppBar from "@material-ui/core/AppBar";
//import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
// import productService from "../../services/ProductServices";
//import axios from "axios";
// import io from "socket.io-client";
// import { useSelector } from "react-redux";
// const socket = io.connect("http://localhost:4001");
// const socket = io.connect("https://familymart.gq");
// const socket = io.connect("https://familymart.gq/api");
// const socket = io.connect(
//   "http://ec2-18-224-94-239.us-east-2.compute.amazonaws.com:4001"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:4001"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:8080"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:5000"
// );
//const socket = io.connect("https://test-express-arqam.herokuapp.com:4001");
//const socket = io.connect("https://test-express-arqam.herokuapp.com:4001");
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Upload", "Instructions", "Review your order"];

export default function Checkout() {
  const [area, setArea] = React.useState("");
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [address1, setAddress1] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [openCartEmptyError, setOpenCartEmptyError] = React.useState(false);
  const [order, setOrder] = React.useState("");
  // const cartBadge = useSelector((state) => state.counter.counter);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClickErrorSnack = () => {
    setOpenError(true);
  };
  const handleClickErrorCartSnack = () => {
    setOpenCartEmptyError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenError(false);
    setOpenCartEmptyError(false);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error("Unknown step");
    }
  }

  const handleNext = () => {
    // handleClick();
    // if (area == "" || fname == "" || lname == "" || address1 == "") {
    //   // handleClick();
    //   // console.log("There is error");
    // } else {
    if (activeStep + 1 < 3) setActiveStep(activeStep + 1);

    if (activeStep == 2) {
      // apiPOSTcart();
      // if (cartBadge == 0) handleClickErrorCartSnack();
    }
  };
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
  // const apiPOSTcart = () => {
  //   //console.log(props.product._id);
  //   productService
  //     .sendOrder({
  //       area: area,
  //       fname: fname,
  //       lname: lname,
  //       address1: address1,
  //       address2: address2,
  //       time: formatAMPM(new Date()),
  //       date:
  //         new Date().getDate() +
  //         "/" +
  //         new Date().getMonth() +
  //         "/" +
  //         new Date().getFullYear(),
  //     })
  //     .then(function (res) {
  //       console.log(res);
  //       console.log("in then");
  //       handleClickErrorSnack();
  //       setActiveStep(activeStep + 1);
  //     })
  //     .then(() => {
  //       setOrder(fname);
  //       console.log(fname);
  //       console.log(order);
  //       socket.emit("message", { fname, lname, address1, address2, area });
  //       console.log(order);
  //     })
  //     .catch(function (error) {
  //       handleClickErrorCartSnack();
  //       console.log(error);
  //     });
  // };
  // React.useEffect(() => {
  //   socket.on("client", (data) => {}, []);
  // });

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div
        style={{ display: "flex", justifyContent: "flex-end" }}
        className={classes.root}
      >
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error">
            Please fill all required fields
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={openCartEmptyError}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            Please add items to you cart.
          </Alert>
        </Snackbar>
      </div>
      <div className={classes.root}>
        <Snackbar
          open={openError}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="success">
            Order sent!
          </Alert>
        </Snackbar>
      </div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
