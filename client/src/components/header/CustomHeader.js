import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import SendIcon from "@material-ui/icons/Send";
import Drawer from "@material-ui/core/Drawer";
import SettingsIcon from "@material-ui/icons/Settings";
import Hidden from "@material-ui/core/Hidden";
import HelpIcon from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
//import InboxIcon from "@material-ui/icons/MoveToInbox";
import MessageIcon from "@material-ui/icons/Message";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
//import MailIcon from "@material-ui/icons/Mail";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
//import NotificationsIcon from "@material-ui/icons/Notifications";
import SearchIcon from "@material-ui/icons/Search";

import { useMediaQuery } from "react-responsive";

import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import {
  makeStyles,
  useTheme,
  fade,
  withStyles,
} from "@material-ui/core/styles";
// import { Switch, Route } from "react-router-dom";
// import Home from "../home/Home";
//import CustomCarousel from "../Carousel/Carousel";
import MoreIcon from "@material-ui/icons/MoreVert";
// import FormOrder from "../order/FormOrder";

// import AddProduct2 from "../products/AddProduct2";

// import Cart from "../cart/Cart";
// import MaterialTableDemo from "../cart/CartScreen";
// import productService from "../../services/ProductServices";
import { withRouter } from "react-router";
import HomeIcon from "@material-ui/icons/Home";
import Push from "push.js";
import { useSelector, useDispatch } from "react-redux";
//import { decrement, zero } from "../../Redux/actions/CartBadgeAction";
// import { set } from "../../Redux/actions/CartBadgeAction";
// import { setOrder, incrementOrder } from "../../Redux/actions/OrderBadgeAction";
//import AddressForm from "../AddressForm/AddressForm";
// import Checkout from "../AddressForm/Checkout";
import SignInSide from "../LoginAndSignUp/SignInSide";
import SignUp from "../LoginAndSignUp/SignUp";
import Brightness4Icon from "@material-ui/icons/Brightness4";
// import io from "socket.io-client";
//import TestRes from "../testResponsive/TestRes";
import BottomNav from "../Bottom navigation/BottomNav";
//import Order from "../order/Order";
// import OrderExpandable from "../order/OrderExpandable";

import { Button, Avatar, InputAdornment, Grid } from "@material-ui/core";
// import userService from "../../services/UserService";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { switchLogin, falseLogin } from "../../Redux/actions/LoginAction";
import { red } from "@material-ui/core/colors";
import Tooltip from "@material-ui/core/Tooltip";
// import CustomList from "../List/CustomList";

// import UpdateProduct from "../products/UpdateProduct";
// import EmptyStockProducts from "../products/EmptyStockProducts";
// import ProductCategory from "../List/ProductCategory";
// import ShowWithTags from "../products/ShowWithTags";
// import Footer from "../footer/Footer";
// import Push from "push.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Routes from "../routes/Routes";
import CustomList from "../DrawerList.js/CustomList";
import userService from "../../services/UserService";
import io from "socket.io-client";
import orderServices from "../../services/OrderServices";
import { incrementOrder, setOrder } from "../../Redux/actions/OrderBadgeAction";
import { baseURL } from "../../services/URL";
// import ShowWithSearch2 from "../products/ShowWithSearch2";
// import ShowExpired from "../products/ShowExpired";
// import CartScreen from "../cart/CartScreen";
const socket = io.connect(baseURL());
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
// const socket = io.connect("https://familymart.gq");
// axios.defaults.baseURL = "https://familymart.gq/api/";
// const socket = io.connect(
//   "http://ec2-18-224-94-239.us-east-2.compute.amazonaws.com:4001"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:8080"
// );
// const socket = io.connect(
//   "http://ec2-18-221-158-145.us-east-2.compute.amazonaws.com:5000"
// );
//ec2-18-221-158-145.us-east-2.compute.amazonaws.com:5000/api/
//const socket = io.connect("https://test-express-arqam.herokuapp.com:4001");
//const socket = io.connect("https://test-express-arqam.herokuapp.com:4001");

function CustomHeader(props) {
  const isLoggedInRedux = useSelector((state) => state.login.isloggedin);
  const widthChecker = () => {
    if (isLoggedInRedux && props.history.location.pathname != "/order") {
      return 205;
    } else {
      return 0;
    }
  };
  const drawerWidth = widthChecker();

  const useStyles = makeStyles((theme) => ({
    root: {
      // display: "flex",
    },
    customizeToolbar: {
      minHeight: 65,
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      [theme.breakpoints.up("sm")]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
      //  flexGrow: 1,
      padding: theme.spacing(0),
    },
    avatar: {
      backgroundColor: red[500],
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(4),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "36ch",
        "&:focus": {
          width: "26ch",
        },
      },
    },
    sectionDesktop: {
      display: "none",
      position: "absolute",
      right: theme.spacing(7),

      [theme.breakpoints.up("md")]: {
        display: "flex",
        //justifyContent: "flex-end",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    largeButton: {
      padding: 0,
    },
    largeIcon: {
      fontSize: "1.5em",
    },
    largeAvatar: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  }));
  console.log("====================================");
  console.log("HEADER");
  console.log(props.history.location);
  console.log("====================================");
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

  const { window } = props;

  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElAvatar, setAnchorElAvatar] = React.useState(null);
  //const [cartBadge, setCartBadge] = React.useState("0");
  //   const cartBadge = useSelector((state) => state.counter.counter);
  const orderBadge = useSelector((state) => state.order.order);
  const isMenuOpen = Boolean(anchorEl);
  const [searchTextField, setSearchTextField] = React.useState("");
  const [top100Films, setTop100Films] = React.useState([]);
  const [avatarImage, setAvatarImage] = React.useState("");
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  // const [showToolBar, setShowToolBar] = React.useState(() => {
  //   return props.history.location.pathname == "/" && isLoggedInRedux;
  // });

  console.log("Is logged in header line 239: " + isLoggedInRedux);
  // console.log("Is logged in header: " + userService.isLoggedin());
  const dispatch = useDispatch();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      props.history.push("/search/" + searchTextField);
    }
  };

  const handleAvatarImage = () => {
    if (userService.getloggedinuser()) {
      if (userService.getloggedinuser().imageUrl) {
        console.log("====================================");
        console.log("IN GOOGLE IMAGE");
        console.log("====================================");
        setAvatarImage(userService.getloggedinuser().imageUrl);
      } else if (userService.getloggedinuser().picture.data.url) {
        setAvatarImage(userService.getloggedinuser().picture.data.url);
      } else {
        console.log("====================================");
        console.log("IN NULL IMAGE");
        console.log("====================================");
        return null;
      }
    }
  };

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAvtar = () => {
    setAnchorEl(null);
  };
  // const buttonClick = () => {
  //   console.log("Notification");
  //   addNotification({
  //     title: "Family Mart",
  //     subtitle: "This is a subtitle",
  //     message: "New Order",
  //     // theme: "darkblue",
  //     native: true, // when using native, your OS will handle theming.
  //   });
  // };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  if (isTabletOrMobile) {
  } else {
  }
  const classes = useStyles();

  //   React.useEffect(() => {
  //     productService
  //       .getAllCartData()
  //       .then(function (cart) {
  //         // dispatch(set(cart.length));
  //         //setCartBadge(cart.length);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   }, [cartBadge, orderBadge]);
  React.useEffect(() => {
    orderServices
      .getFinalOrder()
      .then((data) => {
        console.log(data);
        dispatch(setOrder(data.length));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderBadge]);

  //   React.useEffect(() => {
  //     socket.on("client", (data) => {
  //       dispatch(incrementOrder());

  //       //if (userService.isAdmin()) buttonClick();
  //       //Pus
  //       if (userService.isAdmin())
  //         Push.create("Family Mart", {
  //           body: "You got new order!",
  //           icon: "/icon.png",
  //           requireInteraction: true,
  //           //timeout: 5000,
  //           onClick: function () {
  //             window.focus();
  //             this.close();
  //           },
  //         });
  //       // dispatch(incrementOrder());
  //     });
  //   }, []);
  React.useEffect(() => {
    if (userService.isLoggedin()) {
      dispatch(switchLogin());
    }
  }, []);

  React.useEffect(() => {
    socket.on("client", (data) => {
      dispatch(incrementOrder());
      if (userService.isAdmin())
        Push.create("Trakers", {
          body: "You got new order!",
          requireInteraction: true,
          onClick: function () {
            window.focus();
            this.close();
          },
        });
      // if (userService.isAdmin()) {
      // console.log("====================================");
      // console.log("admin" + userService.isAdmin());
      // console.log("====================================");
    });
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        {/* <Grid container> */}
        {/* <Grid item xs={2}> */}
        {isLoggedInRedux ? (
          <>
            <Avatar
              style={{ marginRight: "10px" }}
              anchorEl={anchorElAvatar}
              onClick={handleClickAvatar}
              aria-label="recipe"
              className={`${classes.largeAvatar} ${classes.avatar}`}
              src={
                userService.getloggedinuser().imageUrl
                  ? userService.getloggedinuser().imageUrl
                  : userService.getloggedinuser().picture
                  ? userService.getloggedinuser().picture.data.url
                  : null
              }
            >
              {userService.getloggedinuser().name
                ? userService.getloggedinuser().name[0].toUpperCase()
                : null}
            </Avatar>
            <Grid container>
              <Grid item xs={12}>
                {" "}
                <Typography variant="h6">
                  {userService.getloggedinuser().name}
                </Typography>
                <Typography>
                  {userService.getloggedinuser().email
                    ? userService.getloggedinuser().email
                    : userService.getUserDetails().email}
                </Typography>
              </Grid>
            </Grid>
          </>
        ) : (
          <></>
        )}
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItem
          button
          onClick={() => {
            userService.logout();
            dispatch(falseLogin());
            if (isTabletOrMobileDevice) props.handleDrawerToggle();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary={"Sign out"} />
        </ListItem>
      </MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>
        <ListItem
          button
          onClick={() => {
            props.history.push("/userdashboard");
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
      </MenuItem>
      <Divider />
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem
        onClick={() => {
          props.history.push("/cart");
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={10} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem> */}
      <Divider />
      <MenuItem
        onClick={() => {
          props.setDark(!props.dark);
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Brightness4Icon />
        </IconButton>
        <p>Dark mode</p>
      </MenuItem>

      <Divider />

      {userService.isLoggedin() ? (
        <MenuItem
          onClick={() => {
            //props.history.push("/signup");
            userService.logout();
            dispatch(falseLogin());
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 4 new mails" color="inherit">
            <ExitToAppIcon />
          </IconButton>
          <p>Sign out</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            props.history.push("/signin");
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 4 new mails" color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <p>Sign in</p>
        </MenuItem>
      )}
      <Divider />
      <MenuItem
        onClick={() => {
          props.history.push("/signup");
          handleMobileMenuClose();
        }}
      >
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge color="secondary">
            <AccountCircleIcon />
          </Badge>
        </IconButton>
        <p>Register</p>
      </MenuItem>

      <Divider />
      {userService.isAdmin() ? (
        <MenuItem
          onClick={() => {
            props.history.push("/admindashboard");
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <Badge badgeContent={orderBadge} color="secondary">
              <MessageIcon />
            </Badge>
          </IconButton>
          <p>Orders</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            props.history.push("/pricing");
            handleMobileMenuClose();
          }}
        >
          <IconButton aria-label="show 11 new notifications" color="inherit">
            <SendIcon />
          </IconButton>
          <p>Send Order</p>
        </MenuItem>
      )}
    </Menu>
  );
  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <CustomList handleDrawerToggle={handleDrawerToggle} />
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />

      {(isLoggedInRedux &&
        (props.history.location.pathname != "/signin" ||
          props.history.location.pathname != "/signup")) ||
      (props.history.location.pathname != "/signin" &&
        props.history.location.pathname != "/signup") ? (
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.customizeToolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              Trakouts
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <Autocomplete
                className={classes.inputInput}
                options={top100Films}
                getOptionLabel={(option) => option.name}
                onInputChange={(event, value) => {
                  setSearchTextField(value);
                }}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => {
                      setSearchTextField(e.target.value);
                    }}
                    value={searchTextField}
                    onKeyDown={handleKeyDown}
                    placeholder="Search…"
                    {...params}
                    // renderInput={(params) => (
                    //   <InputBase
                    //     placeholder="Search…"
                    //     ref={params.ref}
                    //     ref={params.InputProps.ref}
                    //     inputProps={params.inputProps}
                    //     inputProps={{ "aria-label": "search" }}
                    //   />
                    // )}
                  />
                )}
              />
              {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            ></InputBase> */}
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              {isLoggedInRedux ? (
                <span>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      userService.logout();
                      dispatch(falseLogin());
                    }}
                  >
                    <Typography variant="button" variant="h6">
                      Sign out
                    </Typography>
                  </Button>
                </span>
              ) : (
                <div>
                  <Button
                    size="small"
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.history.push("/signin");
                    }}
                  >
                    <Typography variant="button" variant="h6">
                      Sign in
                    </Typography>
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      props.history.push("/signup");
                    }}
                    variant="outlined"
                    color="secondary"
                    style={{ marginLeft: "8px" }}
                  >
                    <Typography variant="button" variant="h6">
                      Register
                    </Typography>
                  </Button>
                </div>
              )}
              {isLoggedInRedux && userService.isAdmin() ? (
                <IconButton
                  aria-label="show 4 new mails"
                  color="inherit"
                  onClick={() => {
                    props.history.push("/admindashboard");
                  }}
                >
                  <Badge badgeContent={orderBadge} color="secondary">
                    <MessageIcon />
                  </Badge>
                </IconButton>
              ) : (
                <></>
              )}
              {/* <IconButton
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => {
                props.history.push("/cart");
              }}
            >
              <Badge badgeContent={10} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton> */}
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  props.setDark(!props.dark);
                }}
              >
                <Badge color="secondary">
                  <Brightness4Icon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  props.history.push("/faq");
                }}
              >
                <Badge color="secondary">
                  <HelpIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => {
                  props.history.push("/pricing");
                }}
              >
                <Badge color="secondary">
                  <MonetizationOnIcon />
                </Badge>
              </IconButton>
              {/* <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton> */}
              {/* <div>
              {userService.getloggedinuser()
                ? userService.getloggedinuser()._id
                : null}
            </div> */}
              {isLoggedInRedux ? (
                <Tooltip title={userService.getloggedinuser().name}>
                  <span style={{ margin: "auto", marginLeft: "10px" }}>
                    <Avatar
                      anchorEl={anchorElAvatar}
                      onClick={handleClickAvatar}
                      aria-label="recipe"
                      className={classes.avatar}
                      src={
                        userService.getloggedinuser().imageUrl
                          ? userService.getloggedinuser().imageUrl
                          : userService.getloggedinuser().picture
                          ? userService.getloggedinuser().picture.data.url
                          : null
                      }
                    >
                      {userService.getloggedinuser().name
                        ? userService.getloggedinuser().name[0].toUpperCase()
                        : null}
                    </Avatar>
                  </span>
                </Tooltip>
              ) : (
                <></>
              )}
            </div>

            <div className={classes.sectionMobile}>
              <IconButton
                className={classes.largeButton}
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon className={classes.largeIcon} />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      ) : (
        <></>
      )}
      {renderMobileMenu}
      {renderMenu}
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>

      <main className={classes.content}>
        {/* {props.history.location.pathname != "/" ? (
          <div className={classes.toolbar} />
        ) : (
          <></>
        )} */}
        {(isLoggedInRedux &&
          (props.history.location.pathname != "/signin" ||
            props.history.location.pathname != "/signup")) ||
        (props.history.location.pathname != "/signin" &&
          props.history.location.pathname != "/signup") ? (
          <div className={classes.toolbar} />
        ) : (
          <></>
        )}
        {/* {(isLoggedInRedux && props.history.location.pathname != "/") ||
        isLoggedInRedux ||
        props.history.location.pathname != "/" ? (
          <div className={classes.toolbar} />
        ) : (
          <></>
        )} */}
        <Routes />
      </main>
    </div>
  );
}

CustomHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(CustomHeader);
