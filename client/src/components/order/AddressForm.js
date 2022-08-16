import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Box,
} from "@material-ui/core";

export default function AddressForm({}) {
  //const [area, setArea] = React.useState("");
  const handleBtn = () => {
    console.log("Handleeeeeeee");
  };

  const handleChange = (event) => {
    // setArea(event.target.value);
    console.log(event.target.value);
  };
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload Picture
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Button
              style={{ marginTop: "10px" }}
              variant="contained"
              component="label"
              //   className={classes.TextFieldMarginTop}
            >
              Upload Picture
              <input
                type="file"
                style={{ display: "none" }}
                accept="image/*"
                // onChange={(event) => {
                //   handleImage(event);
                //
              />
            </Button>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <img
              width="80%"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Aspect_ratio_16_9_example.jpg"
              alt=""
            />
          </Box>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
