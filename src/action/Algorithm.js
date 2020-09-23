import { useLayoutEffect, useState } from "react";

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};
export const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};
export const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const splitCount = (text, toCount) => {
  const textArr = text.split(",");
  if (textArr.length > 1) {
    toCount = textArr.length - 1;
  }
  return { name: text, num: toCount };
};

export const searchDateRange = (time, start, end) => {
  const date = new Date(time).getTime();
  const from = new Date(start).getTime();
  let to = new Date(end).getTime();

  if (from === to) {
    to = to + 1000 * 60 * 60 * 24;
  }

  if (date >= from && date <= to) {
    return true;
  } else {
    return false;
  }
};

export const formatDate = (text) => {
  let date = new Date(text);
  const today = new Date();

  if (date.getFullYear() === today.getFullYear()) {
    if (date.getDate() === today.getDate()) {
      date = date.getHours() + ":" + date.getMinutes();
      return date;
    } else {
      date =
        date.toLocaleDateString("en-GB", {
          month: "short",
        }) +
        " " +
        date.toLocaleDateString("en-GB", {
          day: "numeric",
        });
      return date;
    }
  } else {
    date =
      date.toLocaleDateString("en-GB", {
        year: "numeric",
      }) +
      "/" +
      date.toLocaleDateString("en-GB", {
        month: "numeric",
      }) +
      "/" +
      date.toLocaleDateString("en-GB", {
        day: "numeric",
      });
    return date;
  }
};

export const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};
