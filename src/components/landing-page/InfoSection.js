import React from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import { AiOutlineArrowRight } from "react-icons/ai";
import { makeStyles } from "@material-ui/styles";
import NextLink from "next/link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    paddingTop: "2vh",
  },
  container: {
    minHeight: "100%",
    padding: "0 5.5rem",
    [theme.breakpoints.between("md", "md")]: {
      padding: "0 2rem",
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 1rem",
    },
  },

  infoSection: {
    minHeight: "100%",
    height: "62.5vh",
    maxHeight: "100%",
    padding: "0 3rem",
    width: "100%",
    marginBottom: "20vh",
    [theme.breakpoints.down("md")]: {
      height: "100%",
      padding: "0",
      marginBottom: "15vh",
    },
  },

  smallImg: {
    width: "400px",
    height: "auto",
    borderRadius: "4vh",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  largeImg: {
    width: "46.120058565153734vw",
    height: "auto",
    borderRadius: "4vh",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  infoSectionDescContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
    height: "100%",
  },
  infoSectionLabel: {
    fontFamily: "Manrope,sans-serif",
    fontWeight: 800,
    color: "#2EC5CE",
    fontSize: "0.9rem",
  },
  infoSectionBody: {
    fontFamily: "Manrope,sans-serif",
    fontSize: "1rem",
    lineHeight: "2rem",
    color: "#18191F",
    fontWeight: 400,
  },
  infoSectionLink: {
    fontFamily: "Manrope,sans-serif",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#8C30F5",
    lineHeight: "2rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    color: "#18191F",
    fontFamily: "Manrope,sans-serif",
    fontWeight: 800,
    fontSize: "2.5rem",
    lineHeight: "3.2rem",
    width: "14ch",
    "& > span": {
      color: "#8C30F5",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "2rem",
    },
  },
  leftToRight: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  rightToLeft: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row-reverse",
  },
  linkButton: {
    background: "#8C30F5",
    fontFamily: "Manrope",
  },
}));

const InfoSection = ({
  leftToRight,
  img,
  title,
  heading,
  detail,
  linkTitle,
  to,
  imgClass,
  linkButton,
}) => {
  const classes = useStyles();
  const directionClass = leftToRight
    ? classes.leftToRight
    : classes.rightToLeft;
  
  return (
    <Grid container className={[classes.infoSection, directionClass].join(' ')} spacing={1}>
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        xs={12}
        md={6}
      >
        <img src={img} alt="Section Image" className={classes[imgClass]} />
      </Grid>
      <Grid item className={classes.infoSectionDescContainer} xs={12} md={6}>
        {title && (
          <Typography className={classes.infoSectionLabel}>{title}</Typography>
        )}
        <Typography variant="h4" className={classes.heading}>
          {heading}
        </Typography>
        <Typography
          variant="body1"
          className={classes.infoSectionBody}
          style={{ width: !leftToRight ? "35ch" : "100%" }}
        >
          {detail}
        </Typography>
        {linkTitle && (
          <NextLink color="primary" key={to} href={to} passHref>
            <a>
              <Typography
                className={classes.infoSectionLink}
                color="primary"
                variant="h5"
              >
                {linkTitle} <AiOutlineArrowRight />
              </Typography>
            </a>
          </NextLink>
        )}

        {linkButton && (
          <Button
            color="primary"
            className={classes.linkButton}
            disableElevation
            variant="contained"
          >
            {linkButton}
          </Button>
        )}
      </Grid>
    </Grid>
  );
};

export default InfoSection;
