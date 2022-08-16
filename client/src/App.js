import React from "react";
import "./App.css";
// import Header from "./components/header/Header";
import { BrowserRouter } from "react-router-dom";
import ResponsiveDrawer from "./components/header/ResponsiveDrawer";
import Header from "./components/landingPage/Header";
import Blog from "./components/landingPage/Blog";
import CustomHeader from "./components/header/CustomHeader";

import { Paper, ThemeProvider, createMuiTheme } from "@material-ui/core";
function App() {
  const [dark, setDark] = React.useState(false);
  const theme = createMuiTheme({
    palette: {
      type: dark ? "dark" : "light",
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Paper>
          {/* <ResponsiveDrawer /> */}
          <CustomHeader dark={dark} setDark={setDark} />
        </Paper>
        {/* <Header /> */}
        {/* <Blog /> */}
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
