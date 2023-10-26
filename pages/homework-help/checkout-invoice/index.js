import React, { useEffect, useState } from "react";
import { BsCloudCheckFill } from "react-icons/bs";
import Page from "src/components/shared/Page";
import BackdropLoader from "src/components/shared/BackdropLoader/BackdropLoader";
import { Grid, Typography, Button, Card, Box } from "@material-ui/core";
import { useRouter } from "next/router";
import orderInstance from "src/axios-instances/orders";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { makeStyles } from "@material-ui/styles";
import { useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  Paper: {
    height: "100%",
    width: "100%",
  },

  card: {
    borderRadius: "10px",
  },

  root: {
    padding: "16vh 3.6603221083455346vw 0 3.6603221083455346vw",
    height: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  invoiceContainer: {
    width: "650px",
    padding: "2.25rem 4.6825rem",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      padding: "1.3rem",
    },
  },

  invoiceHead: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  invoiceHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "center",
    },
  },
  invoiceTitle: {
    fontSize: "2.5rem",
    color: "#000000",
    fontWeight: "bold",
    marginLeft: "1.062rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
      marginLeft: ".8rem",
    },
  },
  invoiceAside: {
    fontSize: "0.875rem",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
  },
  question: {
    color: "#9A0FBF",
    marginBottom: ".8rem",
    fontWeight: "bold",
    fontSize: "1.25rem",
  },
  btnSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  ansBtn: {
    width: "75%",
    padding: ".5rem 0",
    textAlign: "center",
    background: "#C5F2C7",
    borderRadius: "8px",
    color: "#1F8B24",
    fontSize: ".875rem",
    fontWeight: "bold",
    marginBottom: ".5rem",
  },
  alert: {
    fontSize: ".875rem",
    color: "#DA100B",
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
    border: "2px solid #9A0FBF",
    borderRadius: "10px",
  },
  divider_2: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "10px",
  },
}));

const CheckoutInvoice = () => {
  const classes = useStyles();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  useEffect(() => {
    if (!router.isReady) return;
    const orderToken = router.query.vqt;
    const getInvoice = async () => {
      try {
        setLoading(true);
        const invoiceResponse = await orderInstance.get("/get-invoice", {
          params: {
            orderToken: orderToken,
          },
        });
        console.log(invoiceResponse.data)
        setInvoiceData(invoiceResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getInvoice();
  }, [router.isReady]);

  return (
    <Page className={classes.root}>
      <BackdropLoader open={loading} />
      <Card className={classes.card}>
        <Grid
          container
          className={classes.invoiceContainer}
          spacing={isMobile ? 1 : 4}
        >
          <Grid
            container
            item
            xs={12}
            className={classes.invoiceHead}
            justifyContent="center"
          >
            <Grid item xs={12} className={classes.invoiceHeader}>
              <BsCloudCheckFill size={43} color="#1F8B24" />
              <Typography variant="h3" className={classes.invoiceTitle}>
                Purchase Complete
              </Typography>
            </Grid>
            <Typography className={classes.invoiceAside}>
              Thank you for choosing definepedia.com as your trusted homework
              helper
            </Typography>
          </Grid>

          <Grid container item xs={12} spacing={1}>
            <Grid container item xs={12} spacing={1}>
              <Grid item md={6} xs={12} className={classes.userInfo}>
                <Typography className={classes.infoTitle}>Name: </Typography>
                <Typography>{invoiceData?.invoice?.customerId.name}</Typography>
              </Grid>
              <Grid item md={6} xs={12} className={classes.userInfo}>
                <Typography className={classes.infoTitle}>Email: </Typography>
                <Typography>
                  {invoiceData?.invoice?.customerId.email}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Box className={classes.divider}></Box>
            </Grid>
          </Grid>

          <Grid container item xs={12} spacing={2}>
            <Grid item md={7} xs={12}>
              <Typography className={classes.question}>Question</Typography>
              <Typography>
                {invoiceData?.invoice?.solutionId.title}
              </Typography>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={6}></Grid>
              <Grid container item xs={6} spacing={1}>
                <Grid item xs={12} className={classes.priceInfo}>
                  <Typography className={classes.infoTitle}>
                    Unit Price:
                  </Typography>
                  <Typography>${invoiceData?.invoice.amount}</Typography>
                </Grid>
                <Grid item xs={12} className={classes.priceInfo}>
                  <Typography className={classes.infoTitle}>
                    Subtotal:
                  </Typography>
                  <Typography>${invoiceData?.invoice.amount}</Typography>
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
                  <Typography>${invoiceData?.invoice.amount}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.btnSection}>
            <Button
              className={classes.ansBtn}
              onClick={(e) =>
                router.push({
                  pathname: "/homework-help/view-answer",
                  query: { vqt: invoiceData?.invoice.orderToken },
                })
              }
            >
              View Answer
            </Button>
            <Typography className={classes.alert}>
              * We’ve also emailed you a download link for this question
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Page>
  );
};

export default CheckoutInvoice;
