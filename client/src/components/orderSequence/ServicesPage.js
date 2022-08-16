import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useSelector, useDispatch } from "react-redux";
// import Instructions from "./Instructions";
import Services from "./Services";
import { Grow } from "@material-ui/core";

export default function ServicesPage(props) {
  console.log(props.category.category);
  const selectedPricing = useSelector((state) => state.pricing.counter);
  const [checkedGrow, setCheckedGrow] = React.useState(false);
  const [titleName, setTitle] = React.useState(() => {
    let test = "";
    if (selectedPricing === 1) {
      test = "Audio Mastering";
    } else if (selectedPricing === 2) {
      test = "Basic Mix";
    } else if (selectedPricing === 3) {
      test = "Premium Mix";
    } else {
      test = "none";
    }

    return test;
  });
  const [image, setImage] = React.useState(() => {
    let test = "";
    if (selectedPricing === 1) {
      test =
        "https://iconcollective.edu/wp-content/uploads/Audio-Mastering-Equipment-652x435.jpg";
    } else if (selectedPricing === 2) {
      test = "https://emendy.co.za/images/course-images/n-amm03.jpg";
    } else if (selectedPricing === 3) {
      test = "https://emendy.co.za/images/course-images/n-amm03.jpg";
    } else {
      test = "none";
    }

    return test;
  });
  const handleChange = () => {
    console.log("Services page loaded");
    setCheckedGrow((prev) => !prev);
  };

  const [clicked, setClicked] = React.useState(false);
  React.useEffect(handleChange, []);

  const setTitleHandler = () => {
    if (selectedPricing === 1) {
      setTitle("Audio Mastering");
    } else if (selectedPricing === 2) {
      setTitle("Basic Mix");
    } else if (selectedPricing === 3) {
      setTitle("Premium Mix");
    }
    console.log(titleName);
  };

  // React.useEffect(setTitleHandler, []);
  return (
    <React.Fragment>
      <>
        <Typography variant="h6" gutterBottom color="error">
          Instructions
        </Typography>
        <Grow
          in={checkedGrow}
          style={{ transformOrigin: "0 0 0" }}
          {...(checkedGrow ? { timeout: 1000 } : {})}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Services
                category={props.category}
                setCategory={props.setCategory}
                title={titleName}
                clicked={clicked}
                setClicked={setClicked}
                price={1}
                time={24}
                image={image}
              />
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <Services
                  category={props.category}
                  setCategory={props.setCategory}
                  title={"Pitch Corrections"}
                  price={1}
                  time={24}
                  clicked={clicked}
                  setClicked={setClicked}
                />
              </Grid> */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                value={props.additionalText}
                onChange={(e) => {
                  props.setAdditionalText(e.target.value);
                }}
                // id="outlined-multiline-static"
                label="Any specific instructions..."
                multiline
                rows={4}
                // defaultValue="Default Value"
                variant="filled"
              />
            </Grid>
          </Grid>
        </Grow>
      </>
      {/* <Grow
          in={checkedGrow}
          style={{ transformOrigin: "0 0 0" }}
          {...(checkedGrow ? { timeout: 1000 } : {})}
        >
          <TextField
            fullWidth
            // id="outlined-multiline-static"
            label="Any specific instructions..."
            multiline
            rows={4}
            defaultValue="Default Value"
            variant="filled"
          />
        </Grow> */}
    </React.Fragment>
  );
}
