import React from "react";
import NextLink from "next/link";
import { makeStyles } from "@material-ui/styles";
import { Typography, Button, useTheme, useMediaQuery } from "@material-ui/core";

import Page from "../../src/components/shared/Page";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
    paddingTop: "10vh",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
  },
  imageContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  image: {
    maxWidth: "100%",
    width: 560,
    maxHeight: 300,
    height: "auto",
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
}));

const Service = () => {
  const classes = useStyles();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Page
      className={classes.root}
      style={{ marginTop: 120 }}
      title="Terms of Service"
    >
      <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
        This page will live very soon
      </Typography>
      <div className={classes.buttonContainer}>
        <NextLink href="/" passHref>
          <Button color="primary" variant="outlined">
            Back to home
          </Button>
        </NextLink>
      </div>
    </Page>
  );
};

export default Service;
