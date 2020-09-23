import React from "react";
import EmailsProvider from "./context/EmailsProvider";

export default function AppContext(props) {
  return <EmailsProvider>{props.children}</EmailsProvider>;
}
