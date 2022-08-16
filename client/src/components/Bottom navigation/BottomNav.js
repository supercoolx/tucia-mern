import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import RestoreIcon from "@material-ui/icons/Restore";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MailIcon from "@material-ui/icons/Mail";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  Badge,
  createMuiTheme,
  ThemeProvider,
  Paper,
  Divider,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// import { useSelector, useDispatch } from "react-redux";
import HomeIcon from "@material-ui/icons/Home";
// import userService from "../../services/UserService";
import SendIcon from "@material-ui/icons/Send";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useSelector } from "react-redux";
import userService from "../../services/UserService";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "relative",
    position: "fixed",
    bottom: "0px",
  },
});

const BottomNav = (props) => {
  // const cartBadge = useSelector((state) => state.counter.counter);
  const orderBadge = useSelector((state) => state.order.order);
  const theme = createMuiTheme({
    palette: {
      type: "light",
    },
  });
  //console.log("Botton: " + props);
  //console.log(props);
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const [openCartEmptyError, setOpenCartEmptyError] = React.useState(false);
  const handleClickErrorCartSnack = () => {
    setOpenCartEmptyError(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenCartEmptyError(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <BottomNavigation
          //  position="static"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          showLabels
          className={classes.root}
        >
          <BottomNavigationAction
            label="Sign in"
            icon={
              <Badge color="secondary">
                <AccountCircleIcon />
              </Badge>
            }
            onClick={() => {
              //console.log("yessssss");

              props.history.push("/signin");
            }}
          />
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => {
              //console.log("yessssss");

              props.history.push("/");
            }}
          />

          {userService.isAdmin() ? (
            <BottomNavigationAction
              label="Orders"
              onClick={() => {
                //console.log("yessssss");

                props.history.push("/admindashboard");
              }}
              icon={
                <Badge badgeContent={orderBadge} color="secondary">
                  <MailIcon />
                </Badge>
              }
            />
          ) : (
            <BottomNavigationAction
              label="Place Order"
              onClick={() => {
                //console.log("yessssss");

                props.history.push("/pricing");
              }}
              icon={
                <Badge color="secondary">
                  <SendIcon />
                </Badge>
              }
            />
          )}
        </BottomNavigation>
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
      </Paper>
    </ThemeProvider>
  );
};
export default withRouter(BottomNav);
