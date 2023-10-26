import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import { CheckCircle } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import propTypes from "prop-types";
import router from "next/router";

const useStyles = makeStyles((theme) => ({
  padding: {
    paddingTop: "1em",
    paddingBottom: "1em",
  },
  stats: {
    display: "inherit",
  },
  termsandCondition: {
    textAlign: "center",
    fontWeight: 700,
    fontFeatureSettings: "'liga' off",
    fontSize: "0.625rem",
  },
}));

const MembershipCard = (props) => {
  const classes = useStyles();
  return (
    <Grid
      direction="column"
      alignItems="center"
      justify="center"
      container
      spacing={2}
    >
      <Grid item>
        <Typography
          variant="h4"
          style={{ fontWeight: 700 }}
          align="center"
          className={classes.padding}
        >
          Want to see Answer & More?
        </Typography>
      </Grid>
      <Grid item className={classes.stats}>
        <Typography align="center" variant="body1">
          Experts are working 24/7 to provide step-by-step solutions and solve
          your problem within few minitus
        </Typography>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          disableElevation
          onClick={() => router.push({ pathname: props.href })}
        >
          See Answer
        </Button>
      </Grid>
      <Grid item>
        <Typography
          color="error"
          className={classes.termsandCondition}
          variant="caption"
        >
          *Terms & Conditions May Apply
        </Typography>
      </Grid>
    </Grid>
  );
};

MembershipCard.propTypes = {
  price: propTypes.number,
  href: propTypes.string,
};

export default MembershipCard;
