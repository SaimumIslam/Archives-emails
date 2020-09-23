import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import clsx from "clsx";

import { TableHead, TableSortLabel } from "@material-ui/core";
import { TableRow, TableCell } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const headCells = [
  {
    id: "from",
    numeric: false,
    disablePadding: false,
    label: "From",
  },
  { id: "to", numeric: false, disablePadding: false, label: "To" },
  { id: "subject", numeric: false, disablePadding: false, label: "Subject" },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
];

const useStyles = makeStyles((theme) => ({
  tableRow: {
    backgroundColor: theme.palette.action.hover,
  },
  column: {
    color: theme.palette.text.secondary,
  },
}));

const EnhancedTableHead = (props) => {
  const classes = useStyles();
  const { order, orderBy, onRequestSort } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
            className={clsx({
              [classes.column]: headCell.id !== orderBy,
            })}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              IconComponent={ArrowDropDownIcon}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired,
};

export default EnhancedTableHead;
