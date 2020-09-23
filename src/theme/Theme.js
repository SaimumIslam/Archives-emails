import { createMuiTheme } from "@material-ui/core/styles";
import { indigo, grey, blueGrey } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: blueGrey[300],
      main: blueGrey[500],
      dark: blueGrey[800],
    },
    secondary: {
      light: indigo[300],
      main: indigo[500],
      dark: indigo[800],
    },
    background: {
      default: grey[200],
    },
  },
  typography: {
    htmlFontSize: 14,
  },
});

export default theme;

// import { amber, blue, blueGrey, brown, cyan } from "@material-ui/core/colors";
// import { deepPurple, deepOrange, green, grey } from "@material-ui/core/colors";
// import { orange } from "@material-ui/core/colors";
// import { indigo, lightBlue, lightGreen, lime } from "@material-ui/core/colors";
// import { pink, purple, red, teal, yellow } from "@material-ui/core/colors";
