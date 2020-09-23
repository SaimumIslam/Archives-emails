import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, SvgIcon } from "@material-ui/core";
import { TableContainer, Table } from "@material-ui/core";
import { TableRow, TableCell } from "@material-ui/core";
import { TableBody, TablePagination } from "@material-ui/core";

import TableHead from "../components/table/TableHead";
import Selected from "../components/common/Selected";
import ErrorBoundary from "../components/hoc/ErrorBoundary";

import { ReactComponent as ClipIcon } from "../data/resources/icon_clip.svg";
import { stableSort, getComparator, formatDate } from "../action/Algorithm";
import { EmailContextApi } from "../action/ContextApi";

const useStyles = makeStyles((theme) => ({
  table: {
    width: "98%",
    margin: theme.spacing(0, 3, 2, 3),
  },
  row: {
    cursor: "pointer",
  },
  selected: {
    color: "blue !important",
    backgroundColor: "transparent !important",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
  hover: {
    "&:hover": {
      backgroundColor: "transparent !important",
      color: "blue !important",
    },
  },
  column: {
    color: "inherit !important",
  },
  text: {
    fontSize: "1rem",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline-block",
    overflow: "hidden",
  },
  countBox: {
    background: "#999",
    color: "#fff",
    fontSize: ".8rem",
    padding: theme.spacing(0, 0.75),
    borderRadius: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
  },
  bold: {
    fontWeight: "bold",
  },
  side: {
    display: "flex",
    justifyContent: "space-between",
  },
  clipIcon: {
    fontSize: "1.1rem",
  },
}));

export default function EnhancedTable() {
  const emailContet = React.useContext(EmailContextApi);
  const rows = emailContet.emails;

  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const textOverflow = (row, item) => {
    let text = row[item.id];

    const number = parseInt(item.width, 10);
    let textWidth = number - item.limit + "rem";

    if (number) {
      const unit = item.width.replace(number.toString(), "");
      textWidth = number - item.limit + unit;
    }

    //only applied for to
    let toCount = 0;
    if (item.id === "to") {
      const textArr = text.split(",");
      if (textArr.length > 1) {
        toCount = textArr.length - 1;
        const length = textArr[0].length + 1;
        textWidth = `${(12 / 20) * length}rem`;
      }
    }
    return { text, textWidth, toCount };
  };

  const tableCells = [
    { id: "from", align: "inherit", width: "15vw", limit: 0 },
    { id: "to", align: "left", width: "15rem", limit: 3 },
    { id: "subject", align: "left", width: "50vw", limit: 3 },
    { id: "date", align: "right", width: "", limit: 0 },
  ];

  return (
    <ErrorBoundary>
      {selected.length > 0 && (
        <Selected selectedItems={selected} setSelectedItems={setSelected} />
      )}
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          aria-label='enhanced table'
        >
          <TableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
          />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    classes={{
                      root: classes.row,
                      hover: classes.hover,
                      selected: classes.selected,
                    }}
                    onClick={(event) => handleClick(event, row.id)}
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.from + index}
                    selected={isItemSelected}
                  >
                    {tableCells.map((item) => {
                      const { text, textWidth, toCount } = textOverflow(
                        row,
                        item
                      );
                      return (
                        <TableCell
                          key={item.id}
                          classes={{ root: classes.column }}
                          align={item.align}
                          style={{ width: item.width }}
                        >
                          <Box className={classes.side}>
                            <Typography
                              style={{
                                width: textWidth,
                              }}
                              classes={{ root: classes.text }}
                              className={clsx({
                                [classes.bold]: item.id === "date",
                              })}
                            >
                              {item.id !== "date" ? text : formatDate(text)}
                            </Typography>
                            {toCount > 0 && (
                              <Typography className={classes.countBox}>
                                +{toCount}
                              </Typography>
                            )}
                            {item.id === "subject" && row.clip && (
                              <SvgIcon className={classes.clipIcon}>
                                <ClipIcon />
                              </SvgIcon>
                            )}
                          </Box>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </ErrorBoundary>
  );
}
