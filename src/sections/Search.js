import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment, SvgIcon, Box } from "@material-ui/core";
import { IconButton } from "@material-ui/core";

import { ReactComponent as CalenderIcon } from "../data/resources/icon_calender.svg";
import { ReactComponent as SearchIcon } from "../data/resources/icon_search.svg";

import ErrorBoundary from "../components/hoc/ErrorBoundary";

import { EmailContextApi } from "../action/ContextApi";
import { searchDateRange } from "../action/Algorithm";

import { rows } from "../data/Demo";

/*global $*/
/*To disable any eslint '$ not defined' errors*/

const useStyles = makeStyles((theme) => ({
  button: {
    background: theme.palette.grey[200],
    borderRadius: theme.spacing(0.5),
    border: "1px solid #bbb",
    padding: theme.spacing(0.85, 1.5),
    marginBottom: theme.spacing(-0.5),
  },
  input: {
    borderRadius: theme.spacing(0, 0.5, 0.5, 0),
  },
  text: {
    margin: theme.spacing(2.5, 0, 1, 0),
    color: theme.palette.text.secondary,
    fontSize: "1rem",
    fontWeight: 700,
  },
  textNum: {
    display: "inline",
    fontSize: "1.5rem",
    marginLeft: theme.spacing(0.5),
    marginBottom: theme.spacing(-1),
  },
}));

export default function Search() {
  const emailContet = React.useContext(EmailContextApi);
  const setEmails = emailContet.setEmails;
  const emailsNum = emailContet.emails.length;

  const [dateRange, setDateRange] = React.useState({
    start: new Date().toLocaleDateString(),
    end: new Date().toLocaleDateString(),
  });

  const classes = useStyles();
  const handleDate = () => {
    $("#date").daterangepicker(
      {
        opens: "center",
        locale: {
          format: "YYYY-MM-DD",
        },
      },
      function (start, end, label) {
        setDateRange({
          start: new Date(start),
          end: new Date(end),
        });
      }
    );
  };

  React.useEffect(() => {
    handleDate();
  }, [setEmails]);

  const hadnleSearch = () => {
    const emails = rows.filter((item) =>
      searchDateRange(item.date, dateRange.start, dateRange.end)
    );
    setEmails(emails);
  };

  return (
    <ErrorBoundary>
      <Box ml={3} mt={3}>
        <Box display='flex' alignItems='center'>
          <TextField
            id='date'
            type='text'
            label='Date'
            variant='outlined'
            size='small'
            margin='dense'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SvgIcon>
                    <CalenderIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
          />
          <IconButton classes={{ root: classes.button }} onClick={hadnleSearch}>
            <SvgIcon>
              <SearchIcon />
            </SvgIcon>
          </IconButton>
        </Box>
        <div className={classes.text}>
          Result:
          {
            <div className={clsx(classes.text, classes.textNum)}>
              {emailsNum}
            </div>
          }
          mail(s)
        </div>
      </Box>
    </ErrorBoundary>
  );
}
