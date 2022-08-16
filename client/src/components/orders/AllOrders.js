import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import GetAppIcon from "@material-ui/icons/GetApp";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import SuccessSnackBar from "../snackBar/SuccessSnackBar";
import {
  Button,
  Chip,
  FormControl,
  Grid,
  LinearProgress,
  Switch,
} from "@material-ui/core";
import orderServices from "../../services/OrderServices";
import { Progress } from "reactstrap";
import Axios from "axios";
import userService from "../../services/UserService";
import { baseURL } from "../../services/URL";
import MaterialSnackBar from "../snackBar/MaterialSnackBar";
import { useDispatch } from "react-redux";
import { setOrder } from "../../Redux/actions/OrderBadgeAction";
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
const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: "2020-01-05", customerId: "11091700", amount: 3 },
      { date: "2020-01-02", customerId: "Anonymous", amount: 1 },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [arrayOfFiles, setArrayOfFiles] = React.useState([]);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [filesID, setFilesID] = React.useState(null);
  const [loaded, setLoaded] = React.useState(0);
  const [status, setStatus] = React.useState(false);
  const [sucessOpen, setSucessOpen] = React.useState(false);
  const [sucessMsg, setSucessMsg] = React.useState("");
  const classes = useRowStyles();
  const [materialMessage, setMaterialMessage] = React.useState("");
  const [openMaterialSnackBar, setOpenMaterialSnackBar] = React.useState(false);
  const getFilesAfterOpen = () => {
    setOpen(!open);
    // console.log("Opened slide");
    // console.log("Row: " + row._id);

    orderServices
      .getFilesAndDownload(row.F_Id)
      .then((res) => {
        console.log(res);
        props.setDownloadLinks(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const download = async () => {
    console.log(props.downloadLinks[0]);
    // fake server request, getting the file url as response
    setTimeout(() => {
      const response = {
        // file: "http://localhost:4000/down/00a5d83a7e5b79f52ad8006a3aa58c52.mp4",
        file: baseURL() + "/storage/" + "/down/" + props.downloadLinks[0],
      };
      // server sent the url to the file!
      // now, let's download:
      // for (let index = 0; index < response.file.length; index++) {
      // window.location.href = response.file;

      props.downloadLinks.map(async (item, index) => {
        // window.location.href = "http://localhost:4000/down/" + item;

        window.open(baseURL() + "/storage/" + "/down/" + item);
        // await sleep(2000);
      });
      // for (let i = 0; i < props.downloadLinks.length; i++) {
      //   window.open(baseURL() + "/down/" + props.downloadLinks[]);

      // }
      // you could also do:
      // window.open(response.file);
    }, 100);
  };
  // const getFilesAndDownloadAfterClick = () => {
  //   orderServices
  //     .getFilesAndDownloadtemp()
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  const onChangeHandler = (event) => {
    setStatus(true);
    // console.log(event.target.files[0]);
    // setSelectedFileName(event.target.files[0].name);
    let fileArray = Array.from(event);
    setArrayOfFiles(fileArray);
    setSelectedFile(fileArray);
    console.log(event);
    // console.log(selectedFile);
    // console.log(selectedFile);
  };
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  const onClickHandler = () => {
    const data = new FormData();

    for (var x = 0; x < selectedFile.length; x++) {
      data.append("file", selectedFile[x]);
    }
    Axios.post(
      baseURL() +
        "/storage/" +
        "/upload/admin/" +
        row._id +
        "/" +
        filesID +
        "/" +
        status,

      data,
      {
        // receive two    parameter endpoint url ,form data
        onUploadProgress: (ProgressEvent) => {
          setLoaded((ProgressEvent.loaded / ProgressEvent.total) * 100);
        },
      }
    ).then((res) => {
      console.log("Response Files id: " + res.data);
      // setFilesId(res.data);
      props.setRender(true);
      openSuccessSnack();
      setFilesID(res.data);
    });
  };

  const getFilesAndDownloadAfterClick = () => {
    orderServices
      .getFilesAndDownload(row.F_Id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const openSuccessSnack = () => {
    setSucessOpen(true);
    setSucessMsg("Order sent!");
  };
  return (
    <React.Fragment>
      <MaterialSnackBar
        open={openMaterialSnackBar}
        setOpen={setOpenMaterialSnackBar}
        materialMessage={materialMessage}
      />
      <SuccessSnackBar
        open={sucessOpen}
        setOpen={setSucessOpen}
        msg={sucessMsg}
      />

      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={getFilesAfterOpen}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton
            aria-label="show 4 new mails"
            color="inherit"
            className={classes.largeButton}
            onClick={() => {
              orderServices
                .delOrder(row._id)
                .then((res) => {
                  // console.log("Deleted oRder");
                  console.log(res);
                  setMaterialMessage(res);
                  setOpenMaterialSnackBar(true);
                  props.setRender(true);
                  // props.setOrderDeleted(true);
                })
                .catch((err) => {
                  console.log(err);
                  setMaterialMessage(err.response.data);
                  setOpenMaterialSnackBar(true);
                });
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row._id}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderCreatedTime}---{row.orderCreatedDate}
        </TableCell>
        <TableCell component="th" scope="row">
          {row.orderCompletedTime}---
          {row.orderCompletedDate}
        </TableCell>
        <TableCell align="right">{row.service_Category.catergory}</TableCell>
        <TableCell align="right">{row.service_Category.time}</TableCell>
        <TableCell align="right">{row.service_Category.price}</TableCell>
        <TableCell align="right">
          {row.status === "true" ? "Completed" : "Pending"}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    {props.downloadLinks.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{ marginBottom: "5px", marginTop: "10px" }}
                        >
                          <IconButton
                            aria-label="show 4 new mails"
                            color="inherit"
                            href={baseURL() + "/storage/" + "/down/" + item}
                            download
                          >
                            <GetAppIcon />
                          </IconButton>

                          <Chip
                            color="primary"
                            variant="outlined"
                            label={item}
                            variant="outlined"
                          />
                        </div>
                      );
                    })}
                  </div>
                </Grid>
              </Grid>
              <Typography
                component="div"
                variant="h4"
                gutterBottom
                component="div"
              >
                Instructions{" "}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                {row.status === "true"
                  ? "(Order has been completed and sent)"
                  : "(Order has not completed yet)"}
              </Typography>
              <Typography variant="h6" gutterBottom component="div">
                {row.comments}
              </Typography>

              <>
                <Button
                  style={{ marginTop: "10px" }}
                  variant="contained"
                  component="label"
                >
                  Upload Edited files
                  <input
                    type="file"
                    name="file"
                    style={{ display: "none" }}
                    multiple
                    // accept=""
                    onChange={(e) => {
                      onChangeHandler(e.target.files);
                      setLoaded(0);
                    }}
                  />
                </Button>
              </>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <div>
                    {arrayOfFiles.map((item, index) => {
                      return (
                        <div
                          key={index}
                          style={{ marginBottom: "5px", marginTop: "10px" }}
                        >
                          <a
                            href={
                              baseURL() + "/storage/" + " / down / " + item.name
                            }
                          >
                            <Chip
                              color="primary"
                              variant="outlined"
                              label={item.name}
                              onDelete={() => {
                                let temp = arrayOfFiles;
                                for (
                                  let index = 0;
                                  index < temp.length;
                                  index++
                                ) {
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
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </Grid>

                <Grid item xs={6}>
                  <LinearProgressWithLabel value={loaded} />
                </Grid>
                <Grid item xs={12}>
                  <Typography>Status</Typography>
                  <Switch
                    // checked={status}
                    checked={row.status === "true" ? true : status}
                    onChange={() => {
                      setStatus(!status);
                    }}
                    name="checkedA"
                    inputProps={{ "aria-label": "secondary checkbox" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={onClickHandler}
                    disabled={selectedFile ? false : true}
                  >
                    Upload and send
                  </Button>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12}>
                  {/* <Button
                    style={{ float: "right" }}
                    variant="contained"
                    color="primary"
                    onClick={download}
                  >
                    Download Files
                  </Button> */}
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData("76qdf727q", "Beauty/Retouching", "24 hours", "$8.0", "Pending"),
  createData("3423jjkn2", "Face swap", "24 hours", "$16.0", "completed"),
];

export default function AllOrders(props) {
  const [allOrders, setAllOrders] = React.useState([]);
  const [downloadLinks, setDownloadLinks] = React.useState([]);
  const [render, setRender] = React.useState(false);
  const dispatch = useDispatch();
  const getOrder = () => {
    orderServices
      .getFinalOrder()
      .then((data) => {
        console.log(data);
        setAllOrders(data);
        setRender(false);
        dispatch(setOrder(data.length));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(getOrder, [render]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Action</TableCell>
            <TableCell>Order ID</TableCell>
            <TableCell>Created at</TableCell>
            <TableCell>Completed at</TableCell>
            <TableCell align="right">Order Type</TableCell>
            <TableCell align="right">Estimated Time</TableCell>
            <TableCell align="right">Paid Amount</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {allOrders.map((row, index) => (
            <Row
              downloadLinks={downloadLinks}
              setDownloadLinks={setDownloadLinks}
              allOrders={allOrders}
              key={index}
              row={row}
            />
          ))} */}
          {props.condition === "completed" ? (
            allOrders.map((row, index) =>
              row.status === "true" ? (
                <Row
                  downloadLinks={downloadLinks}
                  setDownloadLinks={setDownloadLinks}
                  allOrders={allOrders}
                  key={index}
                  row={row}
                  setRender={setRender}
                />
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
          {props.condition === "all" ? (
            allOrders.map((row, index) => (
              <Row
                downloadLinks={downloadLinks}
                setDownloadLinks={setDownloadLinks}
                allOrders={allOrders}
                key={index}
                setRender={setRender}
                row={row}
              />
            ))
          ) : (
            <></>
          )}

          {props.condition === "pending" ? (
            allOrders.map((row, index) =>
              row.status === "false" ? (
                <Row
                  downloadLinks={downloadLinks}
                  setDownloadLinks={setDownloadLinks}
                  allOrders={allOrders}
                  key={index}
                  setRender={setRender}
                  row={row}
                />
              ) : (
                <></>
              )
            )
          ) : (
            <></>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
