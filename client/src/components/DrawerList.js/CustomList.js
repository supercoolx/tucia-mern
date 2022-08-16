import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SendIcon from "@material-ui/icons/Send";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import DashboardIcon from "@material-ui/icons/Dashboard";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import userService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { falseLogin } from "../../Redux/actions/LoginAction";
import { Box, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const CustomList = (props) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 700px)",
  });
  const isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  const isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  const handleClick = () => {
    setOpen(!open);
  };
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Button
            startIcon={<SendIcon />}
            color="primary"
            variant="contained"
            onClick={() => {
              props.history.push("/pricing");
              if (isTabletOrMobileDevice) props.handleDrawerToggle();
            }}
            // inputStyle={{ color: "white", padding: "0 25px" }}
            style={{ borderRadius: 25, marginBottom: "10px" }}
          >
            Place order
          </Button>
        </Box>
      </div>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Trakouts
          </ListSubheader>
        }
        className={classes.root}
      >
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.history.push("/");
              if (isTabletOrMobileDevice) props.handleDrawerToggle();
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </List>
        {userService.isLoggedin() ? (
          // <List component="div" disablePadding>
          //   <ListItem
          //     button
          //     className={classes.nested}
          //     onClick={() => {
          //       userService.logout();
          //       dispatch(falseLogin());
          //       if (isTabletOrMobileDevice) props.handleDrawerToggle();
          //     }}
          //   >
          //     <ListItemIcon>
          //       <ExitToAppIcon />
          //     </ListItemIcon>
          //     <ListItemText primary={"Sign out"} />
          //   </ListItem>
          // </List>
          <></>
        ) : (
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => {
                props.history.push("/signin");
                if (isTabletOrMobileDevice) props.handleDrawerToggle();
              }}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Sign in" />
            </ListItem>
          </List>
        )}

        {!userService.isLoggedin() ? (
          <List
            component="div"
            disablePadding
            onClick={() => {
              props.history.push("/signup");
              if (isTabletOrMobileDevice) props.handleDrawerToggle();
            }}
          >
            <ListItem button className={classes.nested}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        ) : (
          <></>
        )}
        {/* <List component="div" disablePadding>
        <ListItem
          button
          className={classes.nested}
          onClick={() => {
            props.history.push("/pricing");
            if (isTabletOrMobileDevice) props.handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Pricing" />
        </ListItem>
      </List> */}

        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.history.push("/pricing");
              if (isTabletOrMobileDevice) props.handleDrawerToggle();
            }}
          >
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <ListItemText primary="Place order" />
          </ListItem>
        </List>
        {isLoggedInRedux ? (
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => {
                props.history.push("/userdashboard");
                if (isTabletOrMobileDevice) props.handleDrawerToggle();
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="User Dashboard" />
            </ListItem>
          </List>
        ) : (
          <></>
        )}
        {isLoggedInRedux && userService.isAdmin() ? (
          <List component="div" disablePadding>
            <ListItem
              button
              className={classes.nested}
              onClick={() => {
                props.history.push("/admindashboard");
                if (isTabletOrMobileDevice) props.handleDrawerToggle();
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Admin Dashboard" />
            </ListItem>
          </List>
        ) : (
          <></>
        )}
        <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.history.push("/faq");
              if (isTabletOrMobileDevice) props.handleDrawerToggle();
            }}
          >
            <ListItemIcon>
              <ContactSupportIcon />
            </ListItemIcon>
            <ListItemText primary="FAQ" />
          </ListItem>
        </List>
        {/* <List component="div" disablePadding>
          <ListItem
            button
            className={classes.nested}
            onClick={() => {
              props.history.push("/editproduct");
              if (isTabletOrMobile) props.handleDrawerToggle();
            }}
          >
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Update" />
          </ListItem>
        </List> */}

        {/* <List
          component="div"
          disablePadding
          onClick={() => {
            props.history.push("/editproduct");
            if (isTabletOrMobile) props.handleDrawerToggle();
          }}
        >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Delete" />
          </ListItem>
        </List> */}
      </List>
    </>
  );
};
export default withRouter(CustomList);
