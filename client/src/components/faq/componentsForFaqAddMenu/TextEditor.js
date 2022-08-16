import React, { Component } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TextField } from "@material-ui/core";
import "./texteditor.css";
// import "editor-class.css";
const TextEditor = () => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log("====================================");
    console.log(editorState);
    console.log("====================================");
  };

  // const { editorState } = this.state;
  return (
    <Editor
      editorState={editorState}
      //   wrapperClassName="wrapper-class"
      editorClassName="editor-class"
      //   toolbarClassName="toolbar-class"
      //   wrapperStyle={<wrapperStyleObject>}
      // editorStyle={<TextField />}
      onEditorStateChange={onEditorStateChange}
    />
  );
};
export default TextEditor;
