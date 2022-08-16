import React, { Component } from "react";
import GooglePicker from "react-google-picker";
import { Button } from "@material-ui/core";

class GoogleDrive extends Component {
  render() {
    return (
      <GooglePicker
        clientId={
          "16778408863-s5cv03249qaa5140k6cep39f2u2e07en.apps.googleusercontent.com"
        }
        developerKey={"AIzaSyC2LuaXT3z7JMWvT57Cm_9UN0bdcZfH8ds"}
        scope={["https://www.googleapis.com/auth/drive.readonly"]}
        onChange={(data) => console.log("on change:", data)}
        multiselect={true}
        navHidden={true}
        authImmediate={false}
        mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
        viewId={"DOCS"}
      >
        {/* <MyCustomButton /> */}
        <Button variant="contained" color="primary" />
      </GooglePicker>
      //   <GooglePicker
      //     clientId={
      //       "16778408863-1705lr9huv7bem59hs6ar6glsq8rne9l.apps.googleusercontent.com"
      //     }
      //     developerKey={"AIzaSyC1fxfZV5X-l24KH67B5LuAAD25nNTWgYk"}
      //     scope={["https://www.googleapis.com/auth/drive.readonly"]}
      //     onChange={(data) => console.log("on change:", data)}
      //     onAuthFailed={(data) => console.log("on auth failed:", data)}
      //     multiselect={true}
      //     navHidden={true}
      //     authImmediate={false}
      //     viewId={"DOCS"}
      //     mimeTypes={["image/png", "image/jpeg", "image/jpg"]}
      //     createPicker={(google, oauthToken) => {
      //       const googleViewId = google.picker.ViewId.DOCS;
      //       const uploadView = new google.picker.DocsUploadView();
      //       const docsView = new google.picker.DocsView(googleViewId)
      //         .setIncludeFolders(true)
      //         .setSelectFolderEnabled(true);

      //       const picker = new window.google.picker.PickerBuilder()
      //         .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
      //         .enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
      //         .addView(docsView)
      //         .addView(uploadView) /*DocsUploadView added*/
      //         .setOAuthToken(oauthToken)
      //         .setDeveloperKey("AIzaSyC1fxfZV5X-l24KH67B5LuAAD25nNTWgYk")
      //         .setCallback((data) => {
      //           if (data.action == google.picker.Action.PICKED) {
      //             var fileId = data.docs[0].id;
      //             alert("The user selected: " + fileId);
      //             picker();
      //           }
      //         });
      //       picker.build().setVisible(true);
      //     }}
      //   >
      //     <span>Click here</span>
      //     <div className="google"></div>
      //   </GooglePicker>
    );
  }
}

export default GoogleDrive;
