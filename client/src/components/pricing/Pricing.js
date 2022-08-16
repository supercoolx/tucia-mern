import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import { useSelector, useDispatch } from "react-redux";
import { one, two, three } from "../../Redux/actions/PricingAction";
import { withRouter } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const tiers = [
  {
    id: "1",
    title: "Audio Mastering",
    price: "30",
    description: ["1 audio file", "24 hours"],
    buttonText: "GET STARTED",
    buttonVariant: "outlined",
  },
  {
    id: "2",
    title: "Basic Mix",
    subheader: "Most popular",
    price: "100",
    description: ["Unlimited files", "1 week"],
    buttonText: "Get started",
    buttonVariant: "contained",
  },
  {
    id: "3",
    title: "Premium Mix",
    price: "500",
    description: ["Unlimited files", "3-4 days"],
    buttonText: "GET STARTED",
    buttonVariant: "outlined",
  },
];
const footers = [
  {
    id: "1",
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    id: "1",
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    id: "1",
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];

const Pricing = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const selectedPricing = useSelector((state) => state.pricing.counter);

  console.log("Prcing" + selectedPricing);
  dispatch(one());
  console.log("Prcing" + selectedPricing);

  console.log("====================================");
  console.log("Pricing");
  console.log(props.history.location);
  console.log("====================================");
  return (
    <div style={{ margin: "10px" }}>
      <React.Fragment>
        <CssBaseline />
        <Container
          maxWidth="sm"
          component="main"
          className={classes.heroContent}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Pricing
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            component="p"
          >
            Quickly you can select pricing and get started.
          </Typography>
        </Container>

        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {tiers.map((tier) => (
              <Grid
                item
                key={tier.title}
                xs={12}
                sm={tier.title === "Enterprise" ? 12 : 6}
                md={4}
              >
                <Card>
                  <CardHeader
                    title={tier.title}
                    subheader={tier.subheader}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    action={tier.title === "Pro" ? <StarIcon /> : null}
                    className={classes.cardHeader}
                  />
                  <CardContent>
                    <div className={classes.cardPricing}>
                      <Typography
                        component="h2"
                        variant="h4"
                        color="textPrimary"
                      >
                        ${tier.price} USD
                      </Typography>
                      <Typography
                        variant="h6"
                        color="textSecondary"
                      ></Typography>
                    </div>
                    <ul>
                      {tier.description.map((line) => (
                        <Typography
                          component="li"
                          variant="subtitle1"
                          align="center"
                          key={line}
                        >
                          {line}
                        </Typography>
                      ))}
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      variant={tier.buttonVariant}
                      color="primary"
                      onClick={() => {
                        console.log(tier.id);
                        if (tier.id === "1") {
                          dispatch(one());
                        } else if (tier.id === "2") {
                          dispatch(two());
                        } else if (tier.id === "3") {
                          dispatch(three());
                        }

                        props.history.push("/order");
                      }}
                    >
                      {tier.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </React.Fragment>
    </div>
  );
};
export default withRouter(Pricing);
