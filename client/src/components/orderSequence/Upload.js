import React from "react";
import PropTypes from "prop-types";
import Axios from "axios";
import { Progress } from "reactstrap";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useSelector, useDispatch } from "react-redux";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import {
  Grid,
  FormControl,
  Button,
  Box,
  Grow,
  Typography,
  Chip,
} from "@material-ui/core";
import userService from "../../services/UserService";
import { baseURL } from "../../services/URL";
import MaterialSnackBar from "../snackBar/MaterialSnackBar";
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
LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

const Upload = (props) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [arrayOfFiles, setArrayOfFiles] = React.useState([]);
  const [selectedFileName, setSelectedFileName] = React.useState("");
  const [reload, setReload] = React.useState(false);
  const [filesID, setFilesID] = React.useState(null);
  const [materialMessage, setMaterialMessage] = React.useState("");
  const [openMaterialSnackBar, setOpenMaterialSnackBar] = React.useState(false);
  // const [loaded, setLoaded] = React.useState(0);

  const onChangeHandler = (event) => {
    // console.log(event.target.files[0]);
    // setSelectedFileName(event.target.files[0].name);
    let fileArray = Array.from(event);
    setArrayOfFiles(fileArray);
    setSelectedFile(fileArray);
    console.log(event);
    // console.log(selectedFile);
    // console.log(selectedFile);
  };
  const onClickHandler = () => {
    const data = new FormData();
    for (var x = 0; x < selectedFile.length; x++) {
      data.append("file", selectedFile[x]);
    }
    Axios.post(
      baseURL() +
        "/storage/" +
        "/upload/" +
        userService.getloggedinuser()._id +
        "/" +
        filesID,

      data,
      {
        // receive two    parameter endpoint url ,form data
        onUploadProgress: (ProgressEvent) => {
          props.setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      }
    )
      .then((res) => {
        console.log("Response Files id: " + res.data);
        props.setFilesId(res.data);
        setFilesID(res.data);
        setMaterialMessage("Files uploaded");
        setOpenMaterialSnackBar(true);
      })
      .catch((err) => {
        setMaterialMessage("There was an error uploading files!");
        setOpenMaterialSnackBar(true);
      });
  };

  //till upload
  const [checked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  const selectedPricing = useSelector((state) => state.pricing.counter);

  React.useEffect(handleChange, []);
  return (
    <Grow
      in={checked}
      style={{ transformOrigin: "0 0 0" }}
      {...(checked ? { timeout: 1000 } : {})}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            You have selected{" "}
            {selectedPricing === 1
              ? "Audio Mastering Package ($30 USD). You can select only 1 file."
              : null}{" "}
            {selectedPricing === 2
              ? "Basic Mix Package ($100 USD). You can select multiple files."
              : null}{" "}
            {selectedPricing === 3
              ? "Premium Mix Package ($500 USD). You can select multiple files."
              : null}{" "}
          </Typography>
          <div>
            {selectedPricing === 1 ? (
              <FormControl>
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  component="label"
                  startIcon={<FileCopyIcon />}
                  //   className={classes.TextFieldMarginTop}
                >
                  Select Audio Files
                  <input
                    type="file"
                    name="file"
                    style={{ display: "none" }}
                    accept="audio/*"
                    onInputCapture={(e) => {
                      onChangeHandler(e.target.files);
                      console.log("On Change, " + e.target.files);
                      props.setLoaded(0);
                    }}
                    // onChange={(e) => {
                    //   onChangeHandler(e.target.files);
                    //   console.log("On Change, " + e.target.files);
                    //   props.setLoaded(0);
                    // }}
                  />
                </Button>
              </FormControl>
            ) : (
              <FormControl>
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  component="label"
                  startIcon={<FileCopyIcon />}
                  //   className={classes.TextFieldMarginTop}
                >
                  Select Audio Files
                  <input
                    type="file"
                    name="file"
                    style={{ display: "none" }}
                    multiple
                    accept="audio/*"
                    // accept=""
                    onInputCapture={(e) => {
                      onChangeHandler(e.target.files);
                      console.log("On Change, " + e.target.files);
                      props.setLoaded(0);
                    }}
                    // onChange={(e) => {
                    //   onChangeHandler(e.target.files);
                    //   console.log("On Change, " + e.target.files);
                    //   props.setLoaded(0);
                    // }}
                  />
                </Button>
              </FormControl>
            )}
            <MaterialSnackBar
              open={openMaterialSnackBar}
              setOpen={setOpenMaterialSnackBar}
              materialMessage={materialMessage}
            />
            <Grid container>
              <Grid item xs={12}>
                <div style={{ marginTop: "10px" }}>
                  {arrayOfFiles.map((item, index) => {
                    return (
                      <div key={index} style={{ marginBottom: "5px" }}>
                        <Chip
                          color="primary"
                          variant="outlined"
                          label={item.name}
                          onDelete={() => {
                            let temp = arrayOfFiles;
                            // setReload(true);
                            for (let index = 0; index < temp.length; index++) {
                              if (temp[index].name === item.name) {
                                console.log("matched 1: " + item.name);
                                temp.splice(index, 1);
                                console.log(temp);
                                setArrayOfFiles(temp);
                                onChangeHandler(temp);
                              }
                            }
                          }}
                          variant="outlined"
                        />
                      </div>
                    );
                  })}
                </div>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <LinearProgressWithLabel value={props.loaded} />
            </Grid>
          </div>
          <Grid item xs={12}>
            {" "}
            <Button
              variant="contained"
              color="primary"
              onClick={onClickHandler}
              style={{ float: "right", marginTop: "10px" }}
              startIcon={<CloudUploadIcon />}
              disabled={arrayOfFiles.length > 0 ? false : true}
            >
              Upload
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  );
};

export default Upload;
