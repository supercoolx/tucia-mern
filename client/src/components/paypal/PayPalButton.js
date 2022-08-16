import { Button } from "@material-ui/core";
import React from "react";
import PayPal from "./PayPal";
// import { Button } from 'reactstrap';
const PayPalButton = () => {
  const [checkOut, setCheckOut] = React.useState(false);
  return (
    <div>
      {checkOut ? (
        <PayPal></PayPal>
      ) : (
        <Button
          onClick={() => {
            setCheckOut(true);
          }}
          variant="contained"
          color="primary"
        >
          Check out
        </Button>
      )}
    </div>
  );
};

export default PayPalButton;
