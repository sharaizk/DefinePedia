import {
  CardContent,
  Grid,
  Hidden,
  Typography,
  Divider,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import Question from "src/components/homework-help/question-and-answers/Question/Question";
import { useDispatch, useSelector } from "react-redux";
import {
  pageChange,
  questionFetch,
  setInitialQuestions,
  queryChange,
  categorySearch,
} from "src/store/actions/solutionActions";
import BackdropLoader from "src/components/shared/BackdropLoader/BackdropLoader";
import { Search } from "src/components/shared/SearchBar/components";
import Pagination from "src/components/shared/Pagination/Pagination";
import NotFound from "src/components/shared/NotFound";
import Page from "src/components/shared/Page";
import solutionInstance from "src/axios-instances/solution";
import categoryInstance from "src/axios-instances/category";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "4rem",
    overflow: "hidden",
    [theme.breakpoints.up(600)]: {
      paddingTop: "5rem",
    },
  },
  mainDiv: {
    width: "100%",
    padding: "0 4rem",
    [theme.breakpoints.down(600)]: {
      padding: "0 1rem",
    },
  },
  buttonContainer: {
    marginTop: theme.spacing(6),
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    flexGrow: 1,
    padding: theme.spacing(0.5, 2),
  },
  paginationContainer: {
    backgroundColor: "#F4F5F7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 4rem",
    position: "fixed",
    zIndex: 2,
    [theme.breakpoints.down(600)]: {
      padding: "1rem 2rem",
    },
    [theme.breakpoints.down(481)]: {
      justifyContent: "center",
    },
  },
  searchGrid: {
    [theme.breakpoints.down(600)]: {
      marginLeft: "1rem",
    },
  },
  resultTypo: {
    fontSize: "0.8rem",
    fontWeight: 600,
    fontFamily: "Manrope",
  },
  sideImg: {
    height: "175px",
    width: "175px",
  },
  sidbarContent: {
    [theme.breakpoints.down(600)]: {
      display: "none",
    },
  },
  filterBar: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column",
  },
  filterTitle: {
    color: "#730C8F",
  },
  divider: {
    marginTop: "0.75vh",
    border: "1px solid #730C8F",
    width: "100%",
    marginBottom: "1vh",
  },
  Checkbox: {
    marginBottom: "0",
    paddingBottom: "1.2vh",
    "&.MuiCheckbox-root": {
      color: "#818181",
    },
    "&.Mui-checked": {
      color: "#730C8F",
    },
  },
  questionList: {
    scrollbarWidth: "none",
    padding: "0 auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  searchBarContainer: {
    margin: "4.5rem 0 2rem 0",
    [theme.breakpoints.down(618)]: {
      margin: "8rem 0 2rem 0",
    },
    [theme.breakpoints.down(600)]: {
      margin: "6.6rem 0 1rem 0",
    },
    [theme.breakpoints.down(554)]: {
      margin: "10rem 0 1rem 0",
    },
    [theme.breakpoints.down(481)]: {
      margin: "6.6rem 0 1rem 0",
    },
    [theme.breakpoints.down(457)]: {
      margin: "10rem 0 1rem 0",
    },
  },
}));

const QuestionsList = (props) => {
  const router = useRouter();
  const state = useSelector((state) => state.solution);
  const dispatch = useDispatch();
  useEffect(() => {
    if (state.questions.length == 0 && props.questions) {
      // Setting questions from the server side render
      dispatch(setInitialQuestions(props.questions, props.totalPages));
    } else if (router.query?.query) {
      dispatch(questionFetch(state.page, state.limit, router.query.query));
    } else {
      dispatch(categorySearch(1, 10, router.query.category));
    }
    return () => {
      dispatch(queryChange("", false));
    };
  }, [router.query]);

  const handleFilter = (e) => {
    const filterValue = e.target.value;
    if (filterValue === router.query?.category) {
      router.push({
        pathname: "/homework-help/questions-and-answers",
        query: {
          query: "",
        },
      });
    } else {
      router.push({
        pathname: "/homework-help/questions-and-answers",
        query: {
          category: filterValue,
        },
      });
    }
  };

  const RenderCheckBoxes = () => {
    return props.categories.map((subject, key) => {
      console.log(subject);
      return (
        <FormControlLabel
          key={subject._id}
          control={
            <Checkbox
              name={subject.name}
              id={subject._id}
              className={classes.Checkbox}
              onChange={(e) => {
                handleFilter(e);
              }}
              checked={router.query?.category !== subject?.url ? false : true}
              value={subject.url}
            />
          }
          label={subject.name}
        />
      );
    });
  };

  const handlePaginationChange = (event, value) => {
    dispatch(pageChange(value));
    if (!router.query?.category) {
      dispatch(
        questionFetch(value, state.limit, router.query.query, state.isRelated)
      );
    } else {
      dispatch(categorySearch(value, state.limit, router.query?.category));
    }
  };

  const classes = useStyles();
  const Questions = state.questions.map((singleQuestion) => {
    return <Question key={singleQuestion._id} solution={singleQuestion} />;
  });

  return (
    <Page className={classes.root} title="Questions And Answers">
      <BackdropLoader open={state.isLoading} />
      <Grid container spacing={4} className={classes.paginationContainer}>
        <Grid item>
          <Typography className={classes.resultTypo}>
            Found {state.totalSolutions} results
          </Typography>
        </Grid>
        <Grid item>
          <Pagination
            count={state.totalPages}
            defaultPage={state.page ? state.page : props.page}
            handleChange={handlePaginationChange}
          />
        </Grid>
      </Grid>
      <div className={classes.mainDiv}>
        <Grid container direction="column">
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            className={classes.searchBarContainer}
          >
            <Grid
              item
              xs={12}
              className={classes.searchGrid}
              justifyContent="center"
              alignItems="center"
            >
              <Search />
            </Grid>
          </Grid>
          <Grid item container spacing={1} justifyContent="space-between">
            <Hidden xsDown>
              <Grid item xs={2} className={classes.filterBar}>
                <Typography variant="h5" className={classes.filterTitle}>
                  Subjects
                </Typography>
                <Divider className={classes.divider} />
                {RenderCheckBoxes()}
              </Grid>
            </Hidden>
            <Grid item xs={12} sm={8} className={classes.questionList}>
              {state.questions.length > 0 ? (
                <CardContent>{Questions}</CardContent>
              ) : (
                <NotFound />
              )}
            </Grid>
            <Grid item xs={2} className={classes.sidbarContent}>
              <img
                src={"/images/questions-answers.png"}
                alt="avatar"
                className={classes.sideImg}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Page>
  );
};

export async function getServerSideProps(req) {
  let { page, query, category, isrelated, book } = req.query;
  !page ? (page = 1) : (page = +page);
  const categories = await categoryInstance.get("/");
  let solutions = {};

  if (query && !isrelated) {
    solutions = await solutionInstance.get("/elastic/search", {
      params: { query, page: 1, limit: 10 },
    });
  } else if (query && isrelated) {
    solutions = await solutionInstance.get("/related/question", {
      params: {
        question: query,
        category: "books",
        page: 1,
        limit: 10,
      },
    });
  } else if (category) {
    solutions = await solutionInstance.get("/category/search", {
      params: {
        page: 1,
        limit: 10,
        category: category,
      },
    });
  } else if (book) {
    solutions = await solutionInstance.get("/book/search", {
      params: {
        page: 1,
        limit: 10,
        book: book,
      },
    });
  } else {
    solutions = await solutionInstance.get("/elastic/search", {
      params: { query: "", page: 1, limit: 10 },
    });
  }
  return {
    props: {
      page,
      questions: solutions.data.data,
      totalPages: solutions.data.totalSolutions,
      totalSolutions: solutions.data.totalSolutions,
      categories: categories.data,
    },
  };
}

export default QuestionsList;
