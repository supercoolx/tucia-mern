import React from "react";
import { Grid } from "@material-ui/core";
import Checkout from "../order/Checkout";
const OrderSequence = () => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        md={4}
        style={{ border: "1px solid black", height: "90vh" }}
      ></Grid>
      <Grid item xs={12} md={8} style={{ border: "1px solid black" }}>
        {" "}
        <Checkout />
      </Grid>
    </Grid>
  );
};

export default OrderSequence;
