import React from "react";
import PropTypes from "prop-types";

import { lighten, makeStyles } from "@material-ui/core/styles";
import { IconButton, Toolbar, Typography, Tooltip } from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";

import { EmailContextApi } from "../../action/ContextApi";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
  },
  title: {
    flex: "1 1 100%",
  },
}));

const Selected = (props) => {
  const emailContet = React.useContext(EmailContextApi);
  const emails = emailContet.emails;
  const setEmails = emailContet.setEmails;

  const classes = useStyles();
  const { selectedItems, setSelectedItems } = props;

  const handleDelete = (event) => {
    try {
      const arr = emails.filter((item) => {
        return selectedItems.some((id) => id !== item.id);
      });
      setEmails(arr);
    } catch (error) {
      console.log(error);
    }
    setSelectedItems([]);
  };

  return (
    <Toolbar className={classes.root}>
      <Typography
        className={classes.title}
        color='inherit'
        variant='subtitle1'
        component='div'
      >
        {selectedItems.length} selected
      </Typography>
      <Tooltip title='Delete'>
        <IconButton aria-label='delete' onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
};

Selected.propTypes = {
  selectedItems: PropTypes.array.isRequired,
  setSelectedItems: PropTypes.func.isRequired,
};

export default Selected;
