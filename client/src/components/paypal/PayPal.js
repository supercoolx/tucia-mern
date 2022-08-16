import React, { useRef, useEffect } from "react";
import MaterialSnackBar from "../snackBar/MaterialSnackBar";
import SnackBar from "../snackBar/SuccessSnackBar";
import SuccessSnackBar from "../snackBar/SuccessSnackBar";
export default function Paypal(props) {
  const paypal = useRef();
  const [sucessOpen, setSucessOpen] = React.useState(false);

  const [sucessMsg, setSucessMsg] = React.useState("");

  const [materialMessage, setMaterialMessage] = React.useState("");
  const [openMaterialSnackBar, setOpenMaterialSnackBar] = React.useState(false);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: props.selectedPricing.catergory,
                amount: {
                  currency_code: "USD",
                  value: props.selectedPricing.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log(order.status);
          if (order.status === "COMPLETED") {
            props.uploadFinalOrder();
            setSucessOpen(true);
            setSucessMsg("Payment Successful, your order has been sent!");
          }
        },
        onError: (err) => {
          console.log(err);
          setMaterialMessage(
            "Order failed, there was an error during transaction."
          );
          setOpenMaterialSnackBar(true);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <SuccessSnackBar
        open={sucessOpen}
        setOpen={setSucessOpen}
        msg={sucessMsg}
      />
      <MaterialSnackBar
        open={openMaterialSnackBar}
        setOpen={setOpenMaterialSnackBar}
        materialMessage={materialMessage}
      />
      <div ref={paypal}></div>
    </div>
  );
}
