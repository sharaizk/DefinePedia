import { Grid, makeStyles, Typography } from "@material-ui/core";
import NextLink from "next/link";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    backgroundColor: "#F4F5F7",
    padding: "20px",
    paddingTop: "40px",
    marginTop: 32,
  },
  flexGrow: {
    flexGrow: 1,
  },
  urlList: {
    paddingInlineStart: 0,
    "& li": {
      "list-style-type": "none",
      paddingBottom: "12px",
    },
  },
  icon: {
    paddingLeft: "12px",
    paddingRight: "12px",
  },
  navlink: {
    color: "RGB(84, 110, 122)",
    fontSize: "14px",
  },
  bottomFooter: {},
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2}>
        <Grid container item spacing={1} direction="row" justify="space-around">
          <Grid item xs={1} />
          <Grid item xs={2}>
            <Typography color="primary" variant="subtitle1">
              Company
            </Typography>
            <ul className={classes.urlList}>
              <li className={classes.navlink}>
                <NextLink href="/company/about-us" passHref>
                  About Us
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/company/career" passHref>
                  Careers
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/company/contact-us" passHref>
                  Contact Us
                </NextLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" variant="subtitle1">
              Support
            </Typography>
            <ul className={classes.urlList}>
              <li className={classes.navlink}>
                <NextLink href="/support/help-center" passHref>
                  Help Center
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/support/FAQ" passHref>
                  FAQ
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/support/how-it-work" passHref>
                  How It Works
                </NextLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" variant="subtitle1">
              Legal
            </Typography>
            <ul className={classes.urlList}>
              <li className={classes.navlink}>
                <NextLink href="/legal/privacy-policy" passHref>
                  Privacy Policy
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/legal/terms-of-service" passHref>
                  Terms of Service
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/legal/DMCA-policy" passHref>
                  DMCA Policy
                </NextLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={2}>
            <Typography color="primary" variant="subtitle1">
              Useful Links
            </Typography>
            <ul className={classes.urlList}>
              <li className={classes.navlink}>
                <NextLink href="/useful-links/sitemaps" passHref>
                  Sitemaps
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/useful-links/definitions" passHref>
                  Definitions
                </NextLink>
              </li>
              <li className={classes.navlink}>
                <NextLink href="/useful-links/blog" passHref>
                  Blog
                </NextLink>
              </li>
            </ul>
          </Grid>
          <Grid item xs={1} />
        </Grid>
        <Grid
          className={classes.bottomFooter}
          container
          item
          spacing={1}
          direction="row"
          justify="space-around"
        >
          <Grid item xs={3}>
            <Typography color="primary" variant="body2">
              © 2021 DefinePedia. All rights reserved
            </Typography>
          </Grid>
          <Grid container item xs={6} alignItems="center" justify="center">
            <Image
              src="/images/logos/Instagram.png"
              alt="Instagram Account of Definepedia"
              width={32}
              height={32}
              className={classes.icon}
            />
            <Image
              src="/images/logos/Youtube.png"
              alt="Definepedia Youtube Account"
              width={32}
              height={32}
              className={classes.icon}
            />
            <Image
              src="/images/logos/Twitter.png"
              alt="Definepedia Twitter account"
              width={32}
              height={32}
              className={classes.icon}
            />
            <Image
              src="/images/logos/Facebook.png"
              alt="Definepedia Facebook Page"
              width={32}
              height={32}
              className={classes.icon}
            />
          </Grid>
          <Grid item xs={3}>
            <Image
              src="/images/logos/Mastercard.png"
              alt="Payment Method - Mastercard - Definepedia"
              width={45}
              height={31}
            />
            <Image
              src="/images/logos/Visa.png"
              alt="Payment Method - Visa - Definepedia"
              width={45}
              height={31}
            />
            <Image
              src="/images/logos/Stripe.png"
              alt="Payment Method - Stripe - Definepedia"
              width={45}
              height={31}
            />
            <Image
              src="/images/logos/PayPal.png"
              alt="Payment Method - Paypal - Definepedia"
              width={45}
              height={31}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
