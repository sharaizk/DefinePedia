import React from "react";
import { Grid, Hidden, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Search } from "src/components/shared/SearchBar/components";
import { CgFileDocument } from "react-icons/cg";
import { MdPersonOutline, MdOutlineScreenSearchDesktop } from "react-icons/md";
const useStyles = makeStyles((theme) => ({
  section: {
    height: "100vh",
  },
  section1Img: {
    width: "100%",
    height: "auto",
  },
  heroText: {
    fontSize: "2.5rem",
    lineHeight: "3rem",
    fontWeight: 600,
    color: "#323232",
    fontFamily: "Manrope, sans-serif",
    "& > span": {
      color: "#9A0FBF",
    },
    [theme.breakpoints.down(1025)]: {
      fontSize: "2rem",
      whiteSpace: "nowrap",
    },
    [theme.breakpoints.down(769)]: {
      textAlign: "center",
    },
    [theme.breakpoints.down(481)]: {
      fontSize: "1.5rem",
      lineHeight: "1.5rem",
    },
  },
  tags: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0 2rem",
  },
  tagsDetail: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "13px",
    fontFamily: "Manrope, sans-serif",
    fontWeight: 700,
    color: "#000000",

    [theme.breakpoints.down(481)]: {
      flexDirection: "column",
    },
  },
  tagText: {
    color: "black",
    [theme.breakpoints.down(481)]: {
      textAlign: "center",
    },
  },
}));

const HeroSection = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      spacing={2}
      className={classes.section}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        container
        item
        xs={12}
        md={6}
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Hidden mdUp>
          <Grid item xs={12} sm={7}>
            <img
              src={"/images/section1.svg"}
              alt="avatar"
              className={classes.section1Img}
            />
          </Grid>
        </Hidden>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.heroText}>
            Study Smart with the
            <br />
            best <span>homework helper</span>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Search
            placeHolder="Type Your Question here"
            className={classes.search}
            searchButton={true}
            spacing={0}
          />
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item xs={3} sm={3} lg={3} className={classes.tagsDetail}>
            <CgFileDocument color="#9A0FBF" size={16} />
            <Typography className={classes.tagText}>1M+ Solutions</Typography>
          </Grid>
          <Grid item xs={3} sm={5} lg={5} className={classes.tagsDetail}>
            <MdPersonOutline color="#9A0FBF" size={16} />
            <Typography className={classes.tagText}>
              50000+ Students Helped
            </Typography>
          </Grid>
          <Grid item xs={3} sm={4} lg={4} className={classes.tagsDetail}>
            <MdOutlineScreenSearchDesktop color="#9A0FBF" size={16} />
            <Typography className={classes.tagText}>
              24/7 online tutors
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item xs={12} md={6}>
          <img
            src={"/images/section1.svg"}
            alt="avatar"
            className={classes.section1Img}
          />
        </Grid>
      </Hidden>
    </Grid>
  );
};

export default HeroSection;
