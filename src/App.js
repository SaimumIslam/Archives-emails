import React from "react";
import { Hidden } from "@material-ui/core";

import Blank from "./sections/Blank";
import List from "./sections/List";
import Table from "./sections/Table";
import Search from "./sections/Search";

import { EmailContextApi } from "./action/ContextApi"; //get from context api

function App() {
  const emailContet = React.useContext(EmailContextApi);
  const emailsNum = emailContet.emails.length;

  return (
    <React.Fragment>
      <Search />
      {emailsNum > 0 ? (
        <React.Fragment>
          <Hidden mdUp>
            <List />
          </Hidden>
          <Hidden smDown>
            <Table />
          </Hidden>
        </React.Fragment>
      ) : (
        <Blank />
      )}
    </React.Fragment>
  );
}

export default App;
