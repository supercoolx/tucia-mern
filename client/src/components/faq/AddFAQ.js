import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Box, Grid, Paper, TextField } from "@material-ui/core";
import DialgueAddTopic from "./componentsForFaqAddMenu/DialgueAddTopic";
import FAQtopicList from "./componentsForFaqAddMenu/FAQtopicList";
import TextEditor from "./componentsForFaqAddMenu/TextEditor";
import QuirlText from "./componentsForFaqAddMenu/QuirlText";
import MaterialSnackBar from "../snackBar/MaterialSnackBar";
import faqService from "../../services/FaqService";
import SnackBar from "../snackBar/SnackBar";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddFAQ({ open: open, setOpen: setOpen }) {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);

  const [newTopicString, setNewTopicString] = React.useState("");
  const [snackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = React.useState("");
  const [topicList, setTopicList] = React.useState([]);
  const [updateTopicList, setUpdateTopicList] = React.useState(false);
  const [topicSelected, setTopicSelected] = React.useState([]);
  const [topicName, setTopicName] = React.useState("");
  const [articleName, setArticleName] = React.useState("");
  const [articleDesc, setArticleDesc] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    handleSubmit();
    setOpen(false);
  };
  const handleCancelClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    // if (!props.newTopicString) return;
    faqService
      .PostNewFAQ({
        topicName: topicName,
        articleName: articleName,
        articleDesc: articleDesc,
      })
      .then((res) => {
        // setSnackBarOpen(true);
        // setSnackBarMsg("Added new FAQ");
      })
      .catch((err) => {
        // setSnackBarOpen(true);
        // setSnackBarMsg(err.response.data);
      });
  };

  React.useEffect(() => {
    faqService
      .GetAllTopic()
      .then((res) => {
        let array = [];
        res.map((item, index) => {
          array.push(item.topicName);
        });
        setTopicList(array);
      })
      .catch((err) => {});
  }, [updateTopicList]);

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCancelClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Add FAQ
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              disabled={
                articleName.length < 1
                  ? true
                  : articleDesc.length < 1
                  ? true
                  : false
              }
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Grid container justify="center">
          <Grid item xs={11}>
            <DialgueAddTopic
              setNewTopicString={setNewTopicString}
              newTopicString={newTopicString}
              open={snackBarOpen}
              setOpen={setSnackBarOpen}
              materialMessage={setSnackBarMsg}
              setUpdateTopicList={setUpdateTopicList}
              updateTopicList={updateTopicList}
            />
          </Grid>
          <MaterialSnackBar
            open={snackBarOpen}
            setOpen={setSnackBarOpen}
            materialMessage={snackBarMsg}
          />
          <Grid item xs={11}>
            <FAQtopicList
              topicList={topicList}
              setTopicSelected={setTopicSelected}
              topicSelected={topicSelected}
              topicName={topicName}
              setTopicName={setTopicName}
            />
          </Grid>
          <Grid item xs={11}>
            <TextField
              margin="dense"
              label="Artcle Name"
              fullWidth
              value={articleName}
              onChange={(e) => {
                setArticleName(e.target.value);
              }}
              disabled={topicSelected.length < 1 ? true : false}
              error={topicSelected.length < 1 ? true : false}
              helperText={
                topicSelected.length < 1 ? "Select topic first." : null
              }
            />
          </Grid>
          <Grid item xs={11}>
            <Box display="flex" justifyContent="center" alignItems="center">
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                value={articleDesc}
                onChange={(e) => {
                  setArticleDesc(e.target.value);
                }}
                disabled={topicSelected.length < 1 ? true : false}
                error={topicSelected.length < 1 ? true : false}
                helperText={
                  topicSelected.length < 1 ? "Select topic first." : null
                }
                multiline
                rows={6}
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={11}>
            {/* <Box display="flex" justifyContent="center" alignItems="center"> */}
            {/* <TextEditor />
            <QuirlText /> */}
            {/* </Box> */}
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
