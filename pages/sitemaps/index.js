import React from "react";
import Page from "src/components/shared/Page";
import { makeStyles } from "@material-ui/styles";
import { Grid, Typography } from "@material-ui/core";
import sitemapInstance from "src/axios-instances/sitemaps";
import Link from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    padding: "0 8vw",
    [theme.breakpoints.up(280)]: {
      paddingTop: "9vh",
    },
    [theme.breakpoints.up(768)]: {
      paddingTop: "8vh",
    },
    [theme.breakpoints.up(1280)]: {
      paddingTop: "82px",
    },
    [theme.breakpoints.up(1400)]: {
      paddingTop: "9vh",
    },
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "#d500f9",
  },
}));

const Sitemaps = (props) => {
  const classes = useStyles();
  const baseUrl = "/sitemaps/";
  return (
    <Page className={classes.root} title="Sitemaps">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Typography variant="h2" className={classes.title}>
            DefinePedia Sitemaps
          </Typography>
        </Grid>
        {props?.sitemaps?.map((sitemap) => (
          <Grid item xs={12} md={4} key={sitemap._id}>
            <Link href={baseUrl + "/" + sitemap.name} passHref target="_blank">
              {sitemap.name}
            </Link>
          </Grid>
        ))}
      </Grid>
    </Page>
  );
};

export async function getServerSideProps(req) {
  const sitemapResponse = await sitemapInstance.get("/all-sitemaps");
  return {
    props: {
      sitemaps: sitemapResponse.data.data,
    },
  };
}

export default Sitemaps;
