import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

import { ThemeProvider } from "@material-ui/core/styles";
import Theme from "./theme/Theme"; //my theme

import AppContext from "./components/hoc/AppContext"; //context api for all global state

ReactDOM.render(
  <React.Fragment>
    <ThemeProvider theme={Theme}>
      <AppContext>
        <App />
      </AppContext>
    </ThemeProvider>
  </React.Fragment>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
