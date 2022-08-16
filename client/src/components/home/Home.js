import React from "react";
import {
  Grid,
  Paper,
  Box,
  Button,
  FormControl,
  Typography,
} from "@material-ui/core";
import GoogleDrive from "../googleDrive/GoogleDrive";
import PropTypes from "prop-types";
import Axios from "axios";
import { Progress } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import Blog from "../landingPage/Blog";
import PayPalButton from "../paypal/PayPalButton";
import Paypal from "../paypal/PayPal";
import MaterialTable from "../materialTable/MaterialTable";
import Material_Table from "../materialTable/MaterialTable";
import MainFeaturedPost from "../landingPage/MainFeaturedPost";
import Pricing from "../pricing/Pricing";
import { withRouter } from "react-router-dom";
function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: "https://source.unsplash.com/random",
  imgText: "main image description",
  linkText: "Continue reading…",
};

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
const Home = (props) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loaded, setLoaded] = React.useState(0);
  const onChangeHandler = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files);
    // console.log(selectedFile);
  };
  const onClickHandler = () => {
    const data = new FormData();
    for (var x = 0; x < selectedFile.length; x++) {
      data.append("file", selectedFile[x]);
    }
    Axios.post("http://localhost:4000/upload", data, {
      // receive two    parameter endpoint url ,form data
      onUploadProgress: (ProgressEvent) => {
        setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
      },
    }).then((res) => {
      // then print response status
      console.log(res.statusText);
    });
  };
  const handleImage = (data) => {
    Axios.get("http://localhost:4000/data")
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {});
    // Axios.post("http://localhost:4000/upload", data)
    //   .then((res) => {
    //     // console.log(res);
    //   })
    //   .catch((error) => {});
  };

  console.log("====================================");
  console.log("HOME");
  console.log(props.history.location);
  console.log("====================================");

  return (
    <div>
      <MainFeaturedPost post={mainFeaturedPost} />
      <div style={{ margin: "10px" }}>
        <Pricing />
      </div>
    </div>
  );
};

export default withRouter(Home);
