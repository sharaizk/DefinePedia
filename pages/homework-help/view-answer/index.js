import React, { useState, useEffect } from "react";
import Page from "src/components/shared/Page";
import { makeStyles } from "@material-ui/styles";
import BackdropLoader from "src/components/shared/BackdropLoader/BackdropLoader";
import RelatedQuestion from "src/components/homework-help/related-question/related-question";
import Link from "next/link";
import {
  Grid,
  Paper,
  Breadcrumbs,
  Typography,
  Hidden,
  Divider,
  Button,
  Box,
  Link as MuiLink,
  useMediaQuery,
} from "@material-ui/core";
import parser from "react-html-parser";
import { useRouter } from "next/router";
import orderInstance from "src/axios-instances/orders";
import solutionInstance from "src/axios-instances/solution";
import { generate_docx } from "src/utils/docx-generator";
import { QUESTION_ANSWER } from "src/utils/routes.constant";
import BookCard from "src/components/homework-help/category-detail/BookCard";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "16vh",
    width: "100%",
  },
  container: {
    maxHeight: "100%",
    minHeight: "100vh",
    height: "100%",
    padding: "0 4rem",
    [theme.breakpoints.down(768)]: {
      padding: "0 2.8rem",
    },
    [theme.breakpoints.down(600)]: {
      padding: "0 2.2rem",
    },
    [theme.breakpoints.down(400)]: {
      padding: "0 1.8rem",
    },
  },
  rightContainer: {
    height: "max-content",
  },
  breadCrumbContainer: {
    margin: ".4rem .2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "nowrap",
  },

  AnswerContainer: {
    border: "1px solid #730C8F",
    width: "100%",
    borderRadius: "10px",
    padding: "2rem",
    background: "#F7F7F7",
    height: "100%",
  },
  answerPage: {
    background: "#FFF",
    height: "100%",
    borderRadius: "10px",
    padding: "2rem 1.5rem",
  },

  leftContainer: {
    marginTop: "2.83rem",
    height: "max-content",
  },
  bookChapterContainer: {
    flex: "0.2",
  },

  icon: {
    fontSize: "1rem",
    color: "#730C8F",
  },
  sectionTitle: {
    color: "#730C8F",
    fontWeight: 400,
    fontSize: "1.3rem",
    fontFamily: "Manrope",
    marginBottom: "1rem",
  },
  divider: {
    borderBottom: "2px solid #730C8F",
  },
  downloadButton: {
    fontSize: "0.6rem",
    width: "100px",
  },
  viewmoreBtn: {
    width: "100%",
  },
  viewlimit: {
    textAlign: "center",
  },
  categoryCrumb: {
    fontWeight: 600,
  },
  questionContainer: {
    fontFamily: "Manrope",
    margin: "1.5rem 0 2rem 0",
    color: "#141414",
    "& .image": {
      margin: 0,

      [theme.breakpoints.down(481)]: {
        maxWidth: "100%",
      },
    },
    "&  img": {
      height: "auto",
      maxWidth: "100%",
      alignSelf: "center",
      margin: 0,
    },
    "& .table": {
      margin: 0,
    },
    "& table": {
      border: "1px double #b3b3b3",
      borderCollapse: "collapse",
      borderSpacing: 0,
    },
    "& td": {
      border: "1px solid #bfbfbf",
    },
  },
}));

const CategoryCrumb = ({ category }) => {
  const classes = useStyles();
  return (
    <Breadcrumbs seperator=">">
      {category?._id?.parentId?.parentId ? (
        <Typography
          key={category?._id?.parentId?.parentId.url}
          className={classes.categoryCrumb}
          color="primary"
        >
          {category?._id?.parentId?.parentId.name}
        </Typography>
      ) : null}
      {category?._id?.parentId ? (
        <Typography
          key={category?._id?.parentId.url}
          className={classes.categoryCrumb}
          color="primary"
        >
          {category?._id?.parentId.name}
        </Typography>
      ) : null}
      <Typography
        key={category._id.url}
        className={classes.categoryCrumb}
        color="primary"
      >
        {category?._id?.name}
      </Typography>
    </Breadcrumbs>
  );
};

const Answer = () => {
  const downloadDocx = async () => {
    // generates the document given question, answer & filename
    if (answer.title === undefined) {
      generate_docx(sampleQuestion, sampleAnswer, "New File");
    } else {
      generate_docx(answer.question, answer.answer, answer.title);
    }
  };

  const router = useRouter();
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState({});
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [sampleQuestions, setSampleQuestion] = useState([]);

  const direction = useMediaQuery("(max-width:872px)");

  const sampleQuestion =
    "<span>How are financial accountants pressured when they need to make ethical decisions in their work? <br> Is having technical mastery of GAAP enough to practice financial accounting?</span>";
  const sampleAnswer =
    "<span>&nbsp</span><p>Accountants must perceive  the moral dimensions of some situations because GAAP does not define or cover all specific features that are to be reported in financial statements. In these instances accountants must choose among alternatives. These accounting choices influence whether particular stakeholders may be harmed or benefited. Ethical decision-making involves awareness of potential harm or benefit and taking responsibility for the choices which should always consider the public interest.</p>";

  useEffect(() => {
    if (!router?.isReady) return;
    const orderToken = router.query.vqt;
    const getRequest = async () => {
      try {
        if (orderToken) {
          const orderResponse = await orderInstance.post("/get-order", {
            orderToken: orderToken,
          });
          const relatedQuestions = await solutionInstance.get(
            "/related/question",
            {
              params: {
                question: orderResponse.data.metaDescription,
                category: orderResponse.data.category._id.name,
              },
            }
          );
          setRelatedQuestions(relatedQuestions.data.data);
          setAnswer(orderResponse.data);
          setLoading(false);
        }
      } catch (e) {
        setLoading(false);
      }
    };
    getRequest();
  }, [router.isReady]);

  useEffect(() => {
    const getSampleRelatedQuestions = async () => {
      try {
        const solutions = await solutionInstance.get("/elastic/search", {
          params: { query: "", page: 1, limit: 6 },
        });

        setSampleQuestion(solutions.data.data);
      } catch (error) {
        setLoading(false);
      }
    };

    if (!relatedQuestions.length) {
      getSampleRelatedQuestions();
    }
  }, [relatedQuestions.length]);

  const LimitReached = ({ message }) => {
    return <Typography className={classes.viewlimit}>{message}</Typography>;
  };

  const RenderPage = () => {
    if (loading) {
      return <BackdropLoader open={loading} />;
    }

    return (
      <>
        <Hidden xsDown>
          <Grid item xs={12} sm={4} className={classes.leftContainer} container>
            <Grid item xs={12} container direction="column" spacing={2}>
              <Grid item xs={12} className={classes.bookChapterContainer}>
                <Link
                  href={{
                    pathname: `${QUESTION_ANSWER}`,
                    query: {
                      book: answer?.bookSlug,
                    },
                  }}
                  passHref
                >
                  <MuiLink
                    disableTouchRipple
                    variant="contained"
                    disableElevation
                    style={{ textDecoration: "none" }}
                  >
                    <BookCard
                      title={answer?.bookTitle.substring(
                        0,
                        answer?.bookTitle.length - 13
                      )}
                      author={answer?.bookAuthor.split(" ")[0]}
                      publisher={answer?.bookPublisher.split(" ")[0]}
                      image={answer?.bookImage}
                      year={answer?.bookYear}
                      ISBN={answer?.bookISBN}
                      edition={answer?.bookEdition}
                      direction={direction}
                    />
                  </MuiLink>
                </Link>
              </Grid>

              <Grid item className={classes.relatedQuestionContainer}>
                <Typography className={classes.sectionTitle} variant="body2">
                  Related Question
                </Typography>
                <Divider className={classes.divider} />
                {!relatedQuestions.length
                  ? sampleQuestions?.map((question, i) => (
                      <RelatedQuestion
                        key={i}
                        href={`/homework-help/${question?.bookSlug}/${question.slug}`}
                        title={question.title}
                        answer={question.title}
                      />
                    ))
                  : relatedQuestions?.map((related, i) => (
                      <RelatedQuestion
                        key={i}
                        href={`/homework-help/${related?.book?.slug}/${related.slug}`}
                        title={related.title}
                        answer="The Bank issued it later the weekend to do it completely with the sensit..."
                      />
                    ))}
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  disableElevation
                  className={classes.viewmoreBtn}
                  onClick={() =>
                    relatedQuestions.length
                      ? router.push({
                          pathname: "/homework-help/questions-and-answers",
                          query: {
                            query: answer.metaDescription,
                            isrelated: true,
                          },
                        })
                      : router.push({
                          pathname: "/homework-help/questions-and-answers",
                        })
                  }
                >
                  View More
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={8} container className={classes.rightContainer}>
          <Grid item xs={12}>
            <Box className={classes.breadCrumbContainer}>
              {answer.category ? (
                <CategoryCrumb category={answer.category} />
              ) : null}

              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={downloadDocx}
                disableElevation
                className={classes.downloadButton}
              >
                Download
              </Button>
            </Box>
          </Grid>
          <Grid className={classes.AnswerContainer} item xs={12}>
            <Paper className={classes.answerPage}>
              {answer.message ? (
                <LimitReached message={answer.message} />
              ) : (
                <>
                  <Typography className={classes.sectionTitle} variant="body2">
                    Question
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography className={classes.questionContainer}>
                    {answer.question
                      ? parser(answer.question)
                      : parser(sampleQuestion)}
                  </Typography>
                  <Typography className={classes.sectionTitle} variant="body2">
                    Answer
                  </Typography>
                  <Divider className={classes.divider} />
                  <Typography className={classes.questionContainer}>
                    {answer.answer
                      ? parser(answer.answer)
                      : parser(sampleAnswer)}
                  </Typography>
                </>
              )}
            </Paper>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <Page className={classes.root}>
      <Grid container spacing className={classes.container}>
        {RenderPage()}
      </Grid>
    </Page>
  );
};

export default Answer;
