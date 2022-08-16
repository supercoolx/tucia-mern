import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";
import faqService from "../../../services/FaqService";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export default function DialgueAddTopic(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (!props.newTopicString) return;
    setOpen(false);
  };
  const handleCancelClose = () => {
    setOpen(false);
  };
  const handleSubmit = () => {
    if (!props.newTopicString) return;
    faqService
      .PostNewTopic({ topic: props.newTopicString })
      .then((res) => {
        props.setOpen(true);
        props.materialMessage(
          "Added Topic " +
            '"' +
            props.newTopicString.substring(0, 16) +
            `${props.newTopicString.length > 15 ? "..." : null}` +
            '"'
        );
        props.setUpdateTopicList(!props.updateTopicList);
      })
      .catch((err) => {
        props.setOpen(true);

        props.materialMessage(err.response.data);
      });
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Add new topic</Button>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Fill the form</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <TextField
                variant="filled"
                margin="normal"
                required
                fullWidth
                error={!props.newTopicString ? true : false}
                helperText={!props.newTopicString ? "Cannot be empty" : null}
                label="New Topic"
                value={props.newTopicString}
                onChange={(e) => {
                  props.setNewTopicString(e.target.value);
                }}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleCancelClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();
              handleSubmit();
            }}
            color="primary"
          >
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
