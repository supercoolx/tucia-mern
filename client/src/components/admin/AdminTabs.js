import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PhoneIcon from "@material-ui/icons/Phone";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import HelpIcon from "@material-ui/icons/Help";
import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import ThumbDown from "@material-ui/icons/ThumbDown";
import ThumbUp from "@material-ui/icons/ThumbUp";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import HourglassEmptyIcon from "@material-ui/icons/HourglassEmpty";
import ViewListIcon from "@material-ui/icons/ViewList";
import PeopleIcon from "@material-ui/icons/People";
import SettingsIcon from "@material-ui/icons/Settings";
import AllOrders from "../orders/AllOrders";
import Material_Table from "../materialTable/MaterialTable";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Settings from "../settings/Settings";
import CheckAdmin from "../../auth/CheckAdmin";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AdminTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <CheckAdmin>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
            aria-label="scrollable force tabs example"
          >
            <Tab label="All Orders" icon={<ViewListIcon />} {...a11yProps(0)} />
            <Tab
              label="Pending Orders"
              icon={<HourglassEmptyIcon />}
              {...a11yProps(1)}
            />
            <Tab
              label="Completed Orders"
              icon={<AssignmentTurnedInIcon />}
              {...a11yProps(2)}
            />
            <Tab
              label="Registered Users"
              icon={<PeopleIcon />}
              {...a11yProps(3)}
            />
            <Tab label="Settings" icon={<SettingsIcon />} {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AllOrders condition={"all"} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AllOrders condition={"pending"} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllOrders condition={"completed"} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Material_Table />
        </TabPanel>

        <TabPanel value={value} index={4}>
          <Settings />
        </TabPanel>
      </div>
    </CheckAdmin>
  );
}
