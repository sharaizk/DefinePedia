import React from "react";
import { useRouter } from "next/router";
import Page from "src/components/shared/Page";
import Link from "next/link";
import { makeStyles } from "@material-ui/styles";
import {
  Box,
  Grid,
  Card,
  InputLabel,
  Typography,
  Button,
  IconButton,
  useMediaQuery,
  Link as MuiLink,
} from "@material-ui/core";
import categoryInstance from "src/axios-instances/category";
import HtmlParser from "react-html-parser";
import {
  Settings,
  Description,
  ChevronLeft,
  ChevronRight,
} from "@material-ui/icons";
import solutionInstance from "src/axios-instances/solution";
import bookInstance from "src/axios-instances/book";
import Carousel, { consts } from "react-elastic-carousel";
import BookCard from "src/components/homework-help/category-detail/BookCard";
import { RenderIcon } from "src/utils/IconsArray";
import { HOMEWORK_HELP, QUESTION_ANSWER } from "src/utils/routes.constant";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    padding: "7rem 8vw 0 8vw",
  },
  detail: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem 2rem",
    },
  },
  headingSection: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2rem",
  },
  icon: {
    fontSize: "3rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2rem",
    },
  },
  detailHeading: {
    fontSize: "2rem",
    color: "#000000",
    fontWeight: "bold",
    marginLeft: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  detailInfo: {
    maxWidth: "1100px",
    textAlign: "center",
    color: "#000000",
    fontSize: ".9rem",
    lineHeight: "1.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: ".8rem",
    },
  },
  relatedSubjects: {
    margin: "6rem 2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  subjectHeading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "3rem",
    fontSize: "2rem",
    color: "Black",
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      padding: "0 .5rem",
    },
  },
  headingLable: {
    margin: "0 .5rem",
    fontSize: "2rem",
    color: "#9A0FBF",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
    },
  },
  cardStyle: {
    padding: ".8rem",
    display: "flex",
    height: "100%",
    borderRadius: "10px",
    "&:hover": {
      boxShadow: "0px 0px 10px 1px rgba(196,196,196,0.8)",
      cursor: "pointer",
    },
  },
  noteIcon: {
    marginRight: "1rem",
    color: "#9A0FBF",
  },
  solution: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  questionSection: {
    display: "flex",
    marginBottom: ".7rem",
  },
  question: {
    color: "#9A0FBF",
    fontWeight: "bold",
  },
  Label: {
    marginTop: ".2rem",
    marginRight: ".5rem",
    color: "#9A0FBF",
    fontWeight: "bold",
  },
  answerSection: {
    display: "flex",
  },
  viewButton: {
    width: "100%",
    maxWidth: "300px",
    marginTop: "3rem",
    padding: "0.8rem",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#F1E4FF",
    color: "#8E24AA",
    fontSize: "0.8rem",
    textAlign: "center",
    "&:hover": {
      textDecoration: "none",
    },
  },
  divider: {
    borderBottom: "1px solid black",
    margin: ".6rem 0",
  },
  carouselWrapper: {
    width: "100vw",
    maxWidth: "1440PX",
    padding: "1rem 2rem",
    [theme.breakpoints.down("sm")]: {
      padding: "1rem",
    },
  },
  buttonWrapper: {
    display: "flex",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("lg")]: {
      width: "50px",
    },
    [theme.breakpoints.down("sm")]: {
      width: "35px",
    },
  },
  paginationWrapper: {
    display: "flex",
  },
  carouselIcon: {
    fontSize: "2rem",
    cursor: "pointer",
    [theme.breakpoints.down(480)]: {
      fontSize: "1.2rem",
    },
  },
  pagination: {
    margin: "1.5rem .5rem 0 0",
    width: "10px",
    height: "10px",
    borderRadius: "5px",
    backgroundColor: "#9A0FBF",
    cursor: "pointer",
  },
  activePage: {
    backgroundColor: "#9A0FBF",
  },
  inactivePage: {
    backgroundColor: "#F1E4FF",
  },
  bookCard: {
    width: "350px",
    height: "auto",
    [theme.breakpoints.down(964)]: {
      width: "36vw",
    },
    [theme.breakpoints.down(800)]: {
      width: "40vw",
    },
    [theme.breakpoints.down(720)]: {
      width: "320px",
    },
    [theme.breakpoints.down(480)]: {
      width: "80vw",
    },
  },
}));

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 600, itemsToShow: 2, itemsToScroll: 2, renderArrow: () => <></> },
  { width: 768, itemsToShow: 2, renderArrow: () => <></> },
  { width: 880, itemsToShow: 3, renderArrow: () => <></> },
  { width: 1200, itemsToShow: 3 },
];

const Category = ({ data, category, solutions, books }) => {
  const matches = useMediaQuery("(min-width:768px)");
  const router = useRouter();
  const trim = (value) => {
    if (value.lenght > 60) return value;
    return value.substring(0, 60) + "...";
  };

  const customArrows = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <ChevronLeft className={classes.carouselIcon} />
      ) : (
        <ChevronRight className={classes.carouselIcon} />
      );

    return (
      <Box className={classes.buttonWrapper}>
        <IconButton
          onClick={onClick}
          disabled={isEdge}
          className={classes.iconButton}
        >
          {pointer}
        </IconButton>
      </Box>
    );
  };

  const customPagination = ({ pages, activePage, onClick }) => {
    return (
      <Box className={classes.paginationWrapper}>
        {pages.map((page) => {
          const isActivePage = activePage === page;
          return (
            <Box
              key={page}
              onClick={() => onClick(page)}
              active={isActivePage}
              className={
                isActivePage
                  ? [classes.pagination, classes.activePage].join(" ")
                  : [classes.pagination, classes.inactivePage].join(" ")
              }
            ></Box>
          );
        })}
      </Box>
    );
  };

  const classes = useStyles();
  return (
    <Page className={classes.root}>
      <Box className={classes.detail}>
        <Box className={classes.headingSection}>
          <RenderIcon icon={data?.iconName} color={data?.iconColor} />
          <Typography className={classes.detailHeading}>{data.name}</Typography>
        </Box>

        <Typography className={classes.detailInfo}>
          {HtmlParser(data.description)}
        </Typography>
      </Box>

      <Box className={classes.relatedSubjects}>
        <Typography className={classes.subjectHeading}>
          {`Explore By ${data.name} Subjects`}
        </Typography>
        <Grid container spacing={2}>
          {solutions &&
            solutions.map((solution) => {
              return (
                <Grid
                  item
                  md={4}
                  sm={6}
                  xs={12}
                  key={solution._id}
                  onClick={() =>
                    router.push(
                      `/${HOMEWORK_HELP}/${solution.book.slug}/${solution.slug}`
                    )
                  }
                >
                  <Card className={classes.cardStyle}>
                    <Description className={classes.noteIcon} />
                    <Box className={classes.solution}>
                      <Box className={classes.questionSection}>
                        <InputLabel className={classes.Label}>Q:</InputLabel>
                        <Typography className={classes.question}>
                          {trim(solution.title)}
                        </Typography>
                      </Box>
                      <Box className={classes.answerSection}>
                        <InputLabel className={classes.Label}>A:</InputLabel>
                        <Typography className={classes.answer}>
                          {trim(solution.title)}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <Link
          href={{
            pathname: `${QUESTION_ANSWER}`,
            query: {
              category: data.url,
            },
          }}
          passHref
        >
          <MuiLink
            className={classes.viewButton}
            disableTouchRipple
            variant="contained"
            disableElevation
          >
            View All
          </MuiLink>
        </Link>
      </Box>
      <Box className={classes.relatedSubjects}>
        <Typography className={classes.subjectHeading}>
          Explore Top
          <Typography className={classes.headingLable}>{data.name}</Typography>
          Questions by
          <Typography className={classes.headingLable}>Books</Typography>
        </Typography>
        <Box className={classes.carouselWrapper}>
          <Carousel
            breakPoints={breakPoints}
            showArrows={matches}
            renderArrow={customArrows}
            renderPagination={customPagination}
          >
            {books &&
              books.map((book) => {
                return (
                  <Link
                    href={{
                      pathname: `${QUESTION_ANSWER}`,
                      query: {
                        book: book?.slug,
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
                      <Box className={classes.bookCard}>
                        <BookCard
                          key={book._id}
                          title={book?.title.substring(
                            0,
                            book?.title.length - 13
                          )}
                          author={book?.authorName.split(" ")[0]}
                          publisher={book?.publisher.split(" ")[0]}
                          year={book?.year}
                          ISBN={book?.ISBN}
                          edition={book?.edition}
                          image={book?.coverImage}
                        />
                      </Box>
                    </MuiLink>
                  </Link>
                );
              })}
          </Carousel>
        </Box>
      </Box>
    </Page>
  );
};

export async function getStaticPaths() {
  const response = await categoryInstance.get(`/all`, {
    params: {
      page: 1,
      limit: 40,
    },
  });
  const names = response.data?.categories.map((category) => ({
    params: { category: category.url },
  }));
  return {
    paths: names,
    fallback: "blocking",
  };
}
export async function getStaticProps(context) {
  const category = context.params.category;
  const response = await categoryInstance.get(`/one/${category}`);
  const solutionResponse = await solutionInstance.get("/category/search", {
    params: {
      category: response.data.url,
      limit: 9,
      page: 1,
    },
  });
  const bookResponse = await bookInstance.get("/book-by-category", {
    params: {
      categoryId: response.data._id,
      limit: 10,
      page: 1,
    },
  });
  return {
    props: {
      category: category,
      data: response.data,
      solutions: solutionResponse.data.data,
      books: bookResponse.data.data,
    },
  };
}
export default Category;
