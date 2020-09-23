import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { ListItemIcon, ListItemText } from "@material-ui/core";
import { Box, Typography, SvgIcon } from "@material-ui/core";

import { ReactComponent as MailIcon } from "../../data/resources/icon_mail_sp.svg";
import { ReactComponent as ClipIcon } from "../../data/resources/icon_clip.svg";
import { ReactComponent as ArrowIcon } from "../../data/resources/icon_arrow02.svg";

import { splitCount, useWindowSize, formatDate } from "../../action/Algorithm";

const useStyles = makeStyles((theme) => ({
  listText: {
    marginTop: 0,
  },
  listMultiline: {
    marginTop: 0,
  },
  date: {
    fontSize: ".9rem",
    padding: theme.spacing(0, 0.5),
  },
  clipIcon: {
    fontSize: "1.1rem",
  },
  arrowIcon: {
    fontSize: ".6rem",
  },
  side: {
    display: "flex",
    justifyContent: "space-between",
  },
  countBox: {
    background: "#999",
    color: "#fff",
    fontSize: ".8rem",
    padding: theme.spacing(0, 0.75),
    margin: theme.spacing(0, 1),
    borderRadius: theme.spacing(0.5),
    display: "flex",
    alignItems: "center",
  },
  overflow: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    display: "inline-block",
    overflow: "hidden",
  },
  subject: {
    width: "98%",
    display: "block",
    marginLeft: theme.spacing(-2),
  },
  title: {
    width: "60vw",
  },
}));

const ListItemContent = (props) => {
  const classes = useStyles();
  const { item } = props;
  const { name, num } = splitCount(item.to, 0);
  const [emailTo, setEmailTo] = React.useState({
    name: name,
    num: num,
  });
  const [width, height] = useWindowSize();
  const ref = React.useRef();

  React.useEffect(() => {
    if (ref.current.scrollWidth === ref.current.offsetWidth) {
      setEmailTo({ name: name, num: 0 });
    } else {
      setEmailTo({ name: name, num: num });
    }
  }, [ref, width, height, name, num]);

  return (
    <React.Fragment>
      <ListItemIcon style={{ minWidth: 0 }}>
        <SvgIcon>
          <MailIcon />
        </SvgIcon>
      </ListItemIcon>
      <ListItemText
        disableTypography
        classes={{ root: classes.listText, multiline: classes.listMultiline }}
        primary={
          <Box className={classes.side}>
            <Typography
              variant='subtitle2'
              className={clsx(classes.overflow, classes.title)}
            >
              {item.from}
            </Typography>
            <Box display='flex' alignItems='center'>
              {item.clip && (
                <SvgIcon className={classes.clipIcon}>
                  <ClipIcon />
                </SvgIcon>
              )}
              <Typography className={classes.date}>
                {formatDate(item.date)}
              </Typography>
              <SvgIcon className={classes.arrowIcon}>
                <ArrowIcon />
              </SvgIcon>
            </Box>
          </Box>
        }
        secondary={
          <React.Fragment>
            <Box className={classes.side}>
              <Typography
                ref={ref}
                variant='body2'
                className={clsx(classes.overflow, classes.title)}
              >
                {emailTo.name}
              </Typography>
              {emailTo.num > 0 && (
                <Typography className={classes.countBox}>
                  +{emailTo.num}
                </Typography>
              )}
            </Box>
            <Typography className={clsx(classes.overflow, classes.subject)}>
              {item.subject}
            </Typography>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
};

export default React.memo(ListItemContent);
