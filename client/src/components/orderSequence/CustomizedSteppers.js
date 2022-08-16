import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Upload from "./Upload";
import Services from "./Services";
import ServicesPage from "./ServicesPage";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import Review from "./Review";
import { Category, CategorySharp } from "@material-ui/icons";
import userService from "../../services/UserService";
import categoryService from "../../services/CategoryService";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Paypal from "../paypal/PayPal";
import { Box, Grid } from "@material-ui/core";
import CheckLogIn from "../../auth/CheckLogIn";
import { baseURL } from "../../services/URL";
const socket = io.connect(baseURL());
const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  active: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  completed: {
    "& $line": {
      borderColor: "#784af4",
    },
  },
  line: {
    borderColor: "#eaeaf0",
    borderTopWidth: 3,
    borderRadius: 1,
  },
})(StepConnector);

const useQontoStepIconStyles = makeStyles({
  root: {
    color: "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
  },
  active: {
    color: "#784af4",
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "currentColor",
  },
  completed: {
    color: "#784af4",
    zIndex: 1,
    fontSize: 18,
  },
});

function QontoStepIcon(props) {
  const classes = useQontoStepIconStyles();
  const { active, completed } = props;

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#eaeaf0",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <CloudUploadIcon />,
    2: <AudiotrackIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   */
  active: PropTypes.bool,
  /**
   * Mark the step as completed. Is passed to child components.
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Upload Files", "Select a service category", "Confirm"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Upload audio files";
    case 1:
      return "Select a service category";
    case 2:
      return "Confirm your order";
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const selectedPricing = useSelector((state) => state.pricing.counter);
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const [filesId, setFilesId] = React.useState("not");
  const [additionalText, setAdditionalText] = React.useState("");

  const [categoryVar, setCategoryVar] = React.useState("");
  const categoryHandler = () => {
    if (selectedPricing === 1) {
      setCategory({
        catergory: "Audio Mastering",
        price: 30,
        time: "24",
      });
    } else if (selectedPricing === 2) {
      setCategory({
        catergory: "Basic Audio Mixing",
        price: 100,
        time: "1 week",
      });
    } else if (selectedPricing === 3) {
      setCategory({
        catergory: "Premium Audio Mixing",
        price: 500,
        time: "3-4 days",
      });
    }
    // if (selectedPricing === 1) {
    //   setCategoryVar("Audio Mastering");
    // } else if (selectedPricing === 2) {
    //   setCategoryVar("Audio Mastering");
    // } else if (selectedPricing === 3) {
    //   setCategoryVar("Audio Mastering");
    // } else {
    // }
  };
  const [category, setCategory] = React.useState({
    catergory: null,
    price: null,
    time: null,
  });

  React.useEffect(categoryHandler, []);

  // const [category, setCategory] = React.useState({
  //   catergory: () => {
  //     let test = "";
  //     if (selectedPricing === 1) {
  //       test = "Audio Mastering";
  //     } else if (selectedPricing === 2) {
  //       test = "Basic Mix";
  //     } else if (selectedPricing === 3) {
  //       test = "Premium Mix";
  //     } else {
  //       test = "none";
  //     }

  //     return "1";
  //   },
  //   price: () => {
  //     let test = "";
  //     if (selectedPricing === 1) {
  //       test = "30";
  //     } else if (selectedPricing === 2) {
  //       test = "100";
  //     } else if (selectedPricing === 3) {
  //       test = "500";
  //     } else {
  //       test = "none";
  //     }

  //     return test;
  //   },
  //   time: () => {
  //     let test = "";
  //     if (selectedPricing === 1) {
  //       test = "24";
  //     } else if (selectedPricing === 2) {
  //       test = "1 week";
  //     } else if (selectedPricing === 3) {
  //       test = "3-4 days";
  //     } else {
  //       test = "none";
  //     }

  //     return test;
  //   },
  // });

  const [loaded, setLoaded] = React.useState(0);
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
  const uploadFinalOrder = () => {
    categoryService
      .PostFinalOrder(userService.getloggedinuser()._id, filesId, {
        category: category,
        additionalText: additionalText,
        time: formatAMPM(new Date()),
        date:
          new Date().getDate() +
          "/" +
          (new Date().getMonth() + 1) +
          "/" +
          new Date().getFullYear(),
      })
      .then((data) => {
        socket.emit("message", { filesId });
      })
      .catch((error) => {});
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep == 2) {
    }
  };
  React.useEffect(() => {
    socket.on("client", (data) => {}, []);
  });
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <CheckLogIn>
        <div className={classes.root}>
          {/* <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
          {/* <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            connector={<ColorlibConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed - you just have to pay now!
                </Typography>
                {/* <Button onClick={handleReset} className={classes.button}>
              
            </Button> */}
                <Grid container>
                  <Grid item xs={12}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Paypal
                        selectedPricing={category}
                        uploadFinalOrder={uploadFinalOrder}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </div>
            ) : (
              <div>
                {activeStep === 0 ? (
                  <Upload
                    loaded={loaded}
                    setLoaded={setLoaded}
                    filesId={filesId}
                    setFilesId={setFilesId}
                  />
                ) : (
                  <></>
                )}
                {activeStep === 1 ? (
                  <ServicesPage
                    additionalText={additionalText}
                    setAdditionalText={setAdditionalText}
                    category={category}
                    setCategory={setCategory}
                    filesId={filesId}
                    setFilesId={setFilesId}
                  />
                ) : (
                  <></>
                )}
                {activeStep === 2 ? (
                  <Review
                    category={category}
                    setCategory={setCategory}
                    filesId={filesId}
                    setFilesId={setFilesId}
                  />
                ) : (
                  <></>
                )}
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>

                <div style={{ float: "right", marginBottom: "50px" }}>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                    disabled={loaded === 100 ? false : true}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
                {/* {activeStep === 2 ? <Paypal /> : null} */}
              </div>
            )}
          </div>
        </div>
      </CheckLogIn>
    </div>
  );
}
