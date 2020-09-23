import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider } from "@material-ui/core";

import Logo from "../data/resources/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  img: {
    width: "10%",
    transform: `translateY(-60%)`,
  },
}));
function Blank() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Divider variant='fullWidth' />
      <Box className={classes.root}>
        <img src={Logo} alt='logo' className={classes.img} />
      </Box>
    </React.Fragment>
  );
}

export default Blank;
