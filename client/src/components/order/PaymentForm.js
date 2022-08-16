import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Instructions from "./Instructions";

export default function PaymentForm() {
  const [clicked, setClicked] = React.useState(false);
  return (
    <React.Fragment>
      {!clicked ? (
        <>
          <Typography variant="h6" gutterBottom color="error">
            Instructions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Instructions clicked={clicked} setClicked={setClicked} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Instructions clicked={clicked} setClicked={setClicked} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Instructions clicked={clicked} setClicked={setClicked} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Instructions clicked={clicked} setClicked={setClicked} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Instructions clicked={clicked} setClicked={setClicked} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Instructions clicked={clicked} setClicked={setClicked} />
            </Grid>
          </Grid>
        </>
      ) : (
        <TextField
          fullWidth
          // id="outlined-multiline-static"
          label="Any specific instructions..."
          multiline
          rows={4}
          defaultValue="Default Value"
          variant="outlined"
        />
      )}
    </React.Fragment>
  );
}
