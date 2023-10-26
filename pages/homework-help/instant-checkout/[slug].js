import { Card, Grid, Tab, Tabs, Hidden } from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/styles";
import { TabContext, TabPanel } from "@material-ui/lab";
import Page from "src/components/shared/Page";
import React, { useEffect, useState } from "react";
import CreditCardForm from "src/components/homework-help/instant-checkout/CreditcardForm/CreditCardForm";
import CheckoutDetails from "src/components/homework-help/instant-checkout/CheckoutDetails/CheckoutDetails";
import solutionInstance from "src/axios-instances/solution";
import BackdropLoader from "src/components/shared/BackdropLoader/BackdropLoader";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import PaypalForm from "src/components/homework-help/instant-checkout/PaypalForm/PaypalForm";
import { useRouter } from "next/router";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import siteSettingInstance from "src/axios-instances/sitesetting";

const PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPEPUB_KEY;
const stripe = loadStripe(PUBLIC_KEY);

const useStyles = makeStyles((theme) => ({
  Paper: {
    height: "100%",
    width: "100%",
  },
  root: {
    // padding: theme.spacing(3),
    padding: "16vh 3.6603221083455346vw 0 3.6603221083455346vw",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  card: {
    width: theme.breakpoints.values.lg,
    maxWidth: "100%",
    height: "100%",
    // maxHeight:"450px",
    borderRadius: "10px",
  },
  main: {
    paddingTop: "1em",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  title: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  icon: {
    marginRight: "5px",
    fontSize: "20px",
  },
}));

const StyledTabs = withStyles((theme) => ({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    top: "0px",
    "& > div": {
      maxWidth: 220,
      width: "100%",
      borderTop: "3px solid #9A0FBF",
      borderRadius: "10px",
    },
  },
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "initial",
    color: "#616161",
    fontWeight: 500,
    fontSize: "1.2rem",
    borderRadius: "10px 10px 0px 0px",
    background: "#F7F7FF",
    cursor: "pointer",
    transition: "all 0.2s ease-in",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.65rem",
    },
    height: 60,
    "&$selected": {
      color: "#9A0FBF",
      background: "#FFF",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.75)",
    },
    "&:focus": {
      color: "#9A0FBF",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const InstantCheckout = (props) => {
  const classes = useStyles();
  const router = useRouter();
  // const { id, tab } = match.params;
  const [tab, setTab] = useState("credit-card");

  const tabs = [
    {
      value: "credit-card",
      label: (
        <>
          <label className={classes.title}>
            <CreditCardIcon />
            Debit/Credit Card
          </label>
        </>
      ),
    },
    {
      value: "paypal",
      label: (
        <>
          <label className={classes.title}>
            {/* <CgPaypal className={classes.icon} /> */}
            Paypal
          </label>
        </>
      ),
    },
  ];

  const [loading, setLoading] = useState(false);

  const handleTabsChange = (event, value) => {
    setTab(value);
  };

  return (
    <Page className={classes.root} title="Instant Checkout">
      <BackdropLoader open={loading} />
      <Grid container spacing={4} justifyContent="center">
        <Hidden mdUp={true}>
          <Grid item xs={12} md={4}>
            <CheckoutDetails
              price={props.solutionData.price}
              question={props.solutionData.title}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12} md={6} className={classes.grid}>
          <Card className={classes.card}>
            <TabContext value={tab}>
              <StyledTabs
                orientation="horizontal"
                value={tab}
                onChange={handleTabsChange}
                aria-label="Vertical tabs example"
                variant="fullWidth"
              >
                {tabs.map((tab) => {
                  if (tab.value === "paypal" && !props.paypalSetting)
                    return null;
                  return (
                    <StyledTab
                      key={tab.value}
                      label={<p>{tab.label}</p>}
                      value={tab.value}
                      className={classes.tab}
                    />
                  );
                })}
              </StyledTabs>
              <TabPanel value="credit-card">
                <Elements stripe={stripe}>
                  <CreditCardForm
                    slug={router.query.slug}
                    price={props.solutionData?.price}
                    bookId={props.solutionData?.book?.id}
                    setLoading={setLoading}
                  />
                </Elements>
              </TabPanel>
              {props.paypalSetting && (
                <TabPanel value="paypal">
                  <PaypalForm
                    price={props.solutionData?.price}
                    setLoading={setLoading}
                    slug={router.query.slug}
                    bookId={props.solutionData?.book?.id}
                  />
                </TabPanel>
              )}
            </TabContext>
          </Card>
        </Grid>
        <Hidden mdDown>
          <Grid item xs={12} md={4}>
            <CheckoutDetails
              price={props.solutionData?.price}
              question={props.solutionData?.title}
            />
          </Grid>
        </Hidden>
      </Grid>
    </Page>
  );
};

export async function getServerSideProps(req) {
  let { slug } = req.query;

  const solutionResponse = await solutionInstance.get(`/${slug}`);
  // const siteSettingResponse = await siteSettingInstance.get("/by-name", {
  //   params: {
  //     settingName: "paypal",
  //   },
  // });
  const solutionData = solutionResponse.data?.data;
  return {
    props: {
      solutionData,
      paypalSetting: true,
    },
  };
}

export default InstantCheckout;
