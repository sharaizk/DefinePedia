import React from "react";
import { CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  img: {
    height: "25vh",
    marginBottom: "2vh",
  },
  typo: {
    textAlign: "center",
    cursor: "default",
  },
}));
const NotFound = () => {
  const classes = useStyles();
  return (
    <CardContent className={classes.root}>
      <img className={classes.img} src={"/images/nodatafound.svg"} />
      <Typography color="primary" variant="h6" className={classes.typo}>
        No Result Found
      </Typography>
    </CardContent>
  );
};

export default NotFound;
