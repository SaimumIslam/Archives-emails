import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { List, ListItem, TablePagination } from "@material-ui/core";

import ListItemContent from "../components/list/ListItemContent";
import ListHead from "../components/list/ListHead";
import Selected from "../components/common/Selected";
import ErrorBoundary from "../components/hoc/ErrorBoundary";

import { stableSort, getComparator } from "../action/Algorithm";
import { EmailContextApi } from "../action/ContextApi";

const useStyles = makeStyles((theme) => ({
  listItem: {
    "&:hover": {
      backgroundColor: "transparent !important",
      color: "blue !important",
    },
  },
  selected: {
    color: "blue !important",
    backgroundColor: "transparent !important",
    "&:hover": {
      backgroundColor: "transparent !important",
    },
  },
}));

export default function SimpleList() {
  const emailContet = React.useContext(EmailContextApi);
  const rows = emailContet.emails;
  const classes = useStyles();

  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("from");
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

  return (
    <ErrorBoundary>
      {selected.length > 0 && (
        <Selected selectedItems={selected} setSelectedItems={setSelected} />
      )}
      <ListHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      <List>
        {stableSort(rows, getComparator(order, orderBy))
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((item, index) => {
            const isItemSelected = isSelected(item.id);

            return (
              <ListItem
                classes={{
                  root: classes.listItem,
                  selected: classes.selected,
                }}
                alignItems='flex-start'
                button
                divider
                onClick={(event) => handleClick(event, item.id)}
                tabIndex={-1}
                key={item.from + index}
                selected={isItemSelected}
              >
                <ListItemContent item={item} />
              </ListItem>
            );
          })}
      </List>
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
