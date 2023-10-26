import { Grid, Breadcrumbs, Link, Typography, Hidden } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Truncate from "react-truncate";
import DescriptionIcon from "@material-ui/icons/DescriptionOutlined";
import React from "react";
import NextLink from "next/link";
import { CATEGORY } from "src/utils/routes.constant";

const useStyles = makeStyles((theme) => ({
  contentVar: {
    paddingBottom: "2px",
  },
  link: {
    "&:hover": {
      textDecoration: "none",
    },
  },
  questionContent: {},
  categoryCrumb: {
    fontSize: "0.8rem",
    fontWeight: "600",
    fontFamily: "Manrope",

    [theme.breakpoints.down(769)]: {
      fontSize: "0.7rem",
    },
    [theme.breakpoints.down(281)]: {
      fontSize: "0.4rem",
    },
  },
  icon: {
    fontSize: "1rem",
    color: theme.palette.primary.main,
  },
  gridRoot: {
    marginBottom: "1.5rem",
    border: "1px solid #730C8F",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  gridItem: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  question: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  questionContent: {
    marginBottom: ".8rem",
  },
  questionTitle: {
    color: theme.palette.primary.main,
    fontWeight: 600,
  },
  gridFooter: {
    background: "#F1E4FF",
    width: "100%",
    borderRadius: "10px",
    textAlign: "center",
    color: theme.palette.primary.main,
    fontWeight: 600,
    cursor: "pointer",
    "& a": {
      display: "block",
    },
  },
  breadCrumbsContainer: {
    "& .MuiBreadcrumbs-ol": {
      alignItems: "center",
      justifyContent: "center",
    },
  },
  breadCrumbsLink: {
    textDecoration: "none",
    fontWeight: 500,
    "& h6": {
      fontSize: "0.8rem",
      fontWeight: 600,
    },
    "&:hover": {
      textDecoration: "underline",
      textDecorationColor: theme.palette.primary.main,
    },
  },
}));

const CategoryCrumb = ({ category }) => {
  const breadcrumbsLinks = [
    {
      text: category?.parentId?.parentId?.name,
      link: `${CATEGORY}/${category?.parentId?.parentId?.url}`,
    },
    {
      text: category?.parentId?.name,
      link: `${CATEGORY}/${category?.parentId?.url}`,
    },
    {
      text: category?.name,
      link: `${CATEGORY}/${category?.url}`,
    },
  ];

  const classes = useStyles();
  return (
    <Breadcrumbs
      separator="›"
      aria-label="breadcrumb"
      className={classes.breadCrumbsContainer}
    >
      {breadcrumbsLinks.map((singleLink) => {
        if (singleLink.text) {
          return (
            <NextLink
              color="primary"
              key={singleLink.link}
              href={singleLink.link}
              passHref
            >
              <a className={classes.breadCrumbsLink}>
                <Typography color="primary" variant="h6">
                  {singleLink.text}
                </Typography>
              </a>
            </NextLink>
          );
        }
      })}
    </Breadcrumbs>
  );
};

const Question = (props) => {
  const baseSolutionUrl = "/homework-help";
  const { title, question, slug, noOfOrders, views, category, bookslug } =
    props.solution;
  const strippedContent = question.replace(/(<([^>]+)>)/gi, "");
  const classes = useStyles();
  return (
    <Link className={classes.link}>
      <Grid
        container
        spacing={3}
        direction="column"
        className={classes.gridRoot}
      >
        <Grid item className={classes.gridItem}>
          <DescriptionIcon className={classes.icon} />
          <CategoryCrumb category={category} />
        </Grid>
        <Grid item className={[classes.gridItem, classes.question]}>
          <Grid item xs={1}>
            <Typography className={classes.questionTitle}>Q:</Typography>
          </Grid>
          <Grid item xs={11}>
            <Typography className={classes.questionContent}>
              <Truncate lines={3} ellipsis={<span>...</span>}>
                {strippedContent}
              </Truncate>
            </Typography>
          </Grid>
        </Grid>
        <Grid item className={classes.gridFooter}>
          <NextLink
            style={{ width: "100%" }}
            href={`${baseSolutionUrl}/${bookslug}/${slug}`}
          >
            See Full Answer
          </NextLink>
        </Grid>
      </Grid>
    </Link>
  );
};

export default Question;
