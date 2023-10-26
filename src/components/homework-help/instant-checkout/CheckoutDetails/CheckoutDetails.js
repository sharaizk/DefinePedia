import React from "react";
import { Card, Typography, Grid, Divider, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    borderRadius: "10px",
  },

  summaryHeader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem 0",
  },

  summaryTitle: {
    color: "#9A0FBF",
    fontWeight: "bold",
  },
  orderDetail: {
    margin: "1rem 1.25rem",
  },
  questionSection: {
    marginBottom: "1rem",
  },
  question: {
    color: "#474A57",
    marginBottom: ".8rem",
    fontWeight: "bold",
    fontSize: "1rem",
  },

  infoTitle: {
    fontWeight: "bold",
    color: "black",
    marginRight: ".5rem",
  },
  priceInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  divider: {
    width: "100%",
    border: "1px solid #9A0FBF",
    borderRadius: "10px",
  },
  divider_2: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "10px",
  },
}));

const CheckoutDetails = ({ price,question }) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Grid container>
        <Grid item xs={12} className={classes.summaryHeader}>
          <Typography variant="h5" className={classes.summaryTitle}>
            Order Summary
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.divider}></Box>
        </Grid>
        <Grid container item xs={12} className={classes.orderDetail}>
          <Grid item xs={12} className={classes.questionSection}>
            <Typography className={classes.question}>Question</Typography>
            <Typography color="black">
              {question}?
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={6}></Grid>
            <Grid container item xs={6} spacing={1}>
              <Grid item xs={12} className={classes.priceInfo}>
                <Typography className={classes.infoTitle}>
                  Unit Price:
                </Typography>
                <Typography>${price}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.priceInfo}>
                <Typography className={classes.infoTitle}>Subtotal:</Typography>
                <Typography>${price}</Typography>
              </Grid>
              <Grid item xs={12} className={classes.priceInfo}>
                <Typography className={classes.infoTitle}>Tax:</Typography>
                <Typography>$0.00</Typography>
              </Grid>

              <Grid item xs={12}>
                <Box className={classes.divider_2}></Box>
              </Grid>
              <Grid item xs={12} className={classes.priceInfo}>
                <Typography className={classes.infoTitle}>Total:</Typography>
                <Typography>${price}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CheckoutDetails;
