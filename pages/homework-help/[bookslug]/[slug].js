import { useEffect } from "react";
import {
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  Hidden,
  Paper,
  Typography,
} from "@material-ui/core";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { makeStyles } from "@material-ui/styles";
import solutionInstance from "src/axios-instances/solution";
import bookInstance from "src/axios-instances/bookInstance";
import Page from "src/components/shared/Page";
import BackdropLoader from "src/components/shared/BackdropLoader/BackdropLoader";
import MembershipCard from "src/components/shared/MembershipCard/MembershipCard";
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import RelatedQuestion from "src/components/homework-help/related-question/related-question";
import parser from "react-html-parser";
import { CATEGORY } from "src/utils/routes.constant";
const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5.5rem",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    [theme.breakpoints.down(600)]: {
      paddingTop: "4rem",
    },
    [theme.breakpoints.down(578)]: {
      paddingTop: "4.5rem",
    },
  },
  viewAnswerCard: {
    marginBottom: ".9rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem .4rem",
    borderRadius: "10px",
    boxShadow: "1px 1px 5px 0px rgba(168,168,168,0.75)",
    [theme.breakpoints.up(600)]: {
      display: "none",
    },
  },
  cardHeading: {
    borderRadius: "10px",
    margin: ".8rem .5rem",
  },
  answerBtn: {
    [theme.breakpoints.down(418)]: {
      fontSize: ".9rem",
      minWidth: "130px",
    },
  },
  viewAnswerCard: {
    marginBottom: ".9rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: ".5rem .4rem",
    borderRadius: "10px",
    boxShadow: "1px 5px 5px 0px rgba(168,168,168,0.75)",
    [theme.breakpoints.up(600)]: {
      display: "none",
    },
  },

  cardHeading: {
    borderRadius: "10px",
    margin: ".8rem .5rem",
  },
  answerBtn: {
    [theme.breakpoints.down(418)]: {
      fontSize: ".9rem",
      minWidth: "130px",
    },
  },
  breadCrumbs: {
    paddingBottom: "1em",
  },
  breadCrumbsLink: {
    textDecoration: "none",
    fontWeight: 600,
    "& h6": {
      fontWeight: 600,
    },
    "&:hover": {
      textDecoration: "underline",
      fontWeight: 900,
      textDecorationColor: theme.palette.primary.main,
    },
  },
  imageContainer: {
    "&img": {
      width: "100%",
      height: "auto",
    },
  },
  imageButton: {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    msTransform: "translate(-50%, -50%)",
    cursor: "pointer",
  },
  cardHeader: {
    backgroundColor: theme.palette.primary.main,
    "& p": {
      color: "#ffffff",
      fontWeight: 700,
    },
  },
  memberContainer: {
    marginTop: "0.5vw",
  },
  membership: {
    paddingLeft: 40,
    alignContent: "center",
  },
  questionClass: {
    borderRadius: 10,
  },
  expertAnswer: {
    borderColor: theme.palette.primary.main,
    borderRadius: 10,
    borderWidth: "3px",
  },
  answerDetail: {
    textAlign: "center",
  },
  chip: {
    marginTop: "0.5em",
    margin: "0.2em",
    borderColor: theme.palette.primary.main,
  },
  expertAnswerButton: {
    padding: "1em",
    margin: "1em",
    fontSize: "16px",
  },
  sampleAnswer: {
    color: "#2E41B6",
  },
  divider: {
    marginBottom: "1rem",
    border: "3px solid #730C8F",
  },
  questionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "column",
    "& .image": {
      margin: 0,

      [theme.breakpoints.down(481)]: {
        maxWidth: "110%",
      },
    },
    "& p": {
      width: "100%",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      flexDirection: "column",
    },
    "& p > img": {
      height: "auto",
      maxWidth: "100%",
      alignSelf: "center",
      margin: 0,

      [theme.breakpoints.down(481)]: {
        maxWidth: "110%",
      },
    },
  },
}));

const RenderChips = ({ category }) => {
  const classes = useStyles();
  return (
    <>
      {category?.parentId?.parentId ? (
        <NextLink
          href={`${CATEGORY}/${category?.parentId?.parentId.url}`}
          passHref
        >
          <Chip
            className={classes.chip}
            label={`${category?.parentId?.parentId.name}`}
            component="a"
            clickable
            variant="outlined"
          />
        </NextLink>
      ) : null}
      {category?.parentId ? (
        <NextLink href={`${CATEGORY}/${category?.parentId?.url}`} passHref>
          <Chip
            className={classes.chip}
            label={`${category?.parentId.name}`}
            component="a"
            clickable
            variant="outlined"
          />
        </NextLink>
      ) : null}
      {category ? (
        <NextLink href={`${CATEGORY}/${category?.url}`} passHref>
          <Chip
            className={classes.chip}
            label={`${category?.name}`}
            component="a"
            clickable
            variant="outlined"
          />
        </NextLink>
      ) : null}
    </>
  );
};

const SingleSolution = (props) => {
  const classes = useStyles();
  const solution = props.data;
  const slug = props.slug;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const breadcrumbsLinks = [
    { text: "Home", link: "/" },
    { text: "Questions", link: "/homework-help/questions-and-answers" },
    {
      text: solution?.category?.parentId?.parentId?.name,
      link: `${CATEGORY}/${solution?.category?.parentId?.parentId?.url}`,
    },
    {
      text: solution?.category?.parentId?.name,
      link: `${CATEGORY}/${solution?.category?.parentId?.url}`,
    },
    {
      text: solution?.category?.name,
      link: `${CATEGORY}/${solution?.category?.url}`,
    },
  ];

  const newCrumbs = breadcrumbsLinks.map((singleLink) => {
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
  });

  return (
    <Page title={"[Answer] " + solution?.title} className={classes.root}>
      <BackdropLoader open={loading} />

      <div>
        <Grid
          container
          spacing={2}
          style={{
            margin: 0,
            height: "100%",
          }}
        >
          <Grid item sm={1} xs={1} />

          <Grid container item sm={10} xs={10} md={7} spacing={0}>
            <Grid container item xs={12} spacing={2}>
              <Grid item xs={12}>
                <Breadcrumbs
                  className={classes.breadCrumbs}
                  separator="›"
                  aria-label="breadcrumb"
                >
                  {newCrumbs}
                </Breadcrumbs>
                {/* <Search></Search> */}
              </Grid>
              <Grid item xs={12}>
                <Card className={classes.viewAnswerCard}>
                  <Typography className={classes.cardHeading}>
                    Want to see answer & more?
                  </Typography>
                  <Button
                    variant="contained"
                    disableElevation
                    color="secondary"
                    className={classes.answerBtn}
                    onClick={() =>
                      router.push(`/homework-help/instant-checkout/${slug}`)
                    }
                  >
                    View Answer
                  </Button>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Paper elevation={0}>
                  <Card className={classes.questionClass}>
                    <CardHeader
                      className={classes.cardHeader}
                      title={
                        <Typography variant="body1">
                          {"Question: " + solution?.title}
                        </Typography>
                      }
                    />
                    <CardContent className={classes.questionContainer}>
                      {parser(solution.question)}
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
              {solution?.transcribedImageText && (
                <Grid item xs={12}>
                  <Paper elevation={0}>
                    <Card className={classes.questionClass}>
                      <CardContent>
                        <Typography className={classes.questionContainer}>
                          <b>Transcribed Text</b>
                        </Typography>
                        <Typography className={classes.questionContainer}>
                          {solution?.transcribedImageText}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Paper>
                </Grid>
              )}
              <Grid
                item
                container
                alignItems="center"
                justifyContent="center"
                spacing={1}
                direction="column"
              >
                <Card style={{ width: "100%" }} className="outlined-box-purple">
                  <CardContent>
                    <Grid
                      container
                      item
                      alignItems="center"
                      justifyContent="center"
                      direction="column"
                      spacing={1}
                    >
                      <Grid item xs={12}>
                        <Typography
                          variant="h3"
                          className={classes.answerDetail}
                        >
                          Want to see detailed answer with explanation?
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          className={classes.expertAnswerButton}
                          disableElevation
                          color="secondary"
                          onClick={() =>
                            router.push(
                              `/homework-help/instant-checkout/${slug}`
                            )
                          }
                        >
                          <CheckBoxIcon />
                          View Expert Answer
                        </Button>
                      </Grid>
                      <Grid item>
                        <NextLink
                          href={`/homework-help/view-answer?vqt=sample-asnwer`}
                          passHref
                        >
                          <a>
                            <Typography
                              // color="primary"
                              className={classes.sampleAnswer}
                              variant="caption"
                            >
                              Click here to view sample answer format
                            </Typography>
                          </a>
                        </NextLink>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card>
                  <CardContent>
                    <Typography color="primary" variant="h4" gutterBottom>
                      Related Questions
                    </Typography>
                    <Divider color="primary" className={classes.divider} />

                    <Grid container item spacing={2}>
                      {props.relatedquestions.map((related, i) => (
                        <Grid key={i} item xs={12} sm={6}>
                          <RelatedQuestion
                            key={i}
                            href={`/homework-help/${related?.book?.slug}/${related.slug}`}
                            title={related.title}
                            answer="The Bank issued it later the weekend to do it completely with the sensit..."
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Hidden xsDown smDown>
            <Grid
              direction="column"
              container
              item
              spacing={2}
              md={3}
              className={classes.memberContainer}
            >
              <Grid item></Grid>
              <Grid item>
                <MembershipCard
                  className={classes.membership}
                  href={"/homework-help/instant-checkout/" + slug}
                  price={solution?.price}
                />
              </Grid>
              <Grid item>
                <Typography color="primary" style={{ fontWeight: 700 }}>
                  Subjects
                </Typography>
                <Divider />
                <Grid>
                  <RenderChips category={solution.category} />
                </Grid>
              </Grid>
              <Grid item>
                <Image src="/images/Saly-14.svg" width="459" height="1011" />
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </div>
    </Page>
  );
};

export async function getStaticPaths(prop) {
  const response = await solutionInstance.get(`/`, {
    params: {
      page: 1,
      limit: 40,
    },
  });
  const slugs = response.data.data.map((solution) => ({
    params: { slug: solution.slug, bookslug: solution?.book?.slug },
  }));
  // console.log(slugs)
  return {
    paths: slugs,
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const slug = context.params.slug;
  const response = await solutionInstance.get(`/${slug}`);
  const { category, question } = response.data.data;
  const relatedQuestions = await solutionInstance.get("/related/question", {
    params: {
      question,
      category: category.name,
    },
  });
  return {
    props: {
      slug: response.data.data.slug,
      data: response.data.data,
      relatedquestions: relatedQuestions.data.data,
    },
  };
}

export default SingleSolution;
