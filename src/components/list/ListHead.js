import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";

import { Box, Typography, Divider } from "@material-ui/core";

import { SvgIcon } from "@material-ui/core";
import { ReactComponent as ArrowDownIcon } from "../../data/resources/icon_arrow01.svg";

const headCells = [
  {
    id: "from",
    label: "From",
  },
  { id: "to", label: "To" },
  { id: "subject", label: "Subject" },
  { id: "date", label: "Date" },
];

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.action.hover,
    padding: theme.spacing(1, 1, 1, 2),
  },
  box: {
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    margin: theme.spacing(0, 1),
    "&:hover": {
      "& $hidden": {
        visibility: "visible",
      },
    },
  },
  hidden: {
    visibility: "hidden",
  },
  expand: {
    transform: "rotate(180deg)",
    fontSize: ".7rem",
    margin: theme.spacing(0, 0.5),
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(0deg)",
  },
  column: {
    color: theme.palette.text.secondary,
  },
  divider: { backgroundColor: theme.palette.text.primary },
}));

const ListHead = (props) => {
  const classes = useStyles();
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <Box className={classes.root}>
      {headCells.map((headCell) => (
        <Box
          key={headCell.id}
          className={classes.box}
          onClick={createSortHandler(headCell.id)}
        >
          <Typography
            className={clsx({
              [classes.column]: headCell.id !== orderBy,
            })}
          >
            {headCell.label}
          </Typography>
          <SvgIcon
            className={clsx(classes.expand, {
              [classes.expandOpen]: order === "asc" && headCell.id === orderBy,
              [classes.hidden]: headCell.id !== orderBy,
            })}
          >
            <ArrowDownIcon />
          </SvgIcon>
          <Divider
            orientation='vertical'
            flexItem
            className={clsx({
              [classes.divider]: headCell.id === orderBy,
            })}
          />
        </Box>
      ))}
    </Box>
  );
};

ListHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default ListHead;
