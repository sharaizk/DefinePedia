import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Paper, Button, Input, List, ListItem } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import solutionInstance from "src/axios-instances/solution";
import HtmlParser from "react-html-parser";
import NextLink from "next/link";
import {
  setInitialQuestions,
  questionFetch,
  pageChange,
  queryChange,
} from "src/store/actions/solutionActions";
import { useDispatch, useSelector } from "react-redux";
import { AddOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";
import { QUESTION_ANSWER, HOMEWORK_HELP } from "src/utils/routes.constant";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: "flex",
    alignItems: "center",
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon,
  },
  searchInput: {
    flexGrow: 1,
  },
  seeAllBtn: {
    color: theme.palette.primary.main,
    alignSelf: "flex-end",
    fontSize: "0.7rem",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  searchButton: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },

  grid: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  list: {
    position: "absolute",
    top: "100%",
    left: "1%",
    width: "98.5%",
    padding: "5px",
    maxHeight: "72vh",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  listItem: {
    fontWeight: 400,
    cursor: "pointer",
    fontSize: "0.8rem",
    lineHeight: "1rem",
    borderTop: "1px solid #ededed",
    fontFamily: "Manrope,sans-serif",
    "& span": {
      fontWeight: 600,
      color: "#8C30F5",
      padding: "1px 5px",
    },
  },
  oneList: {
    transitionProperty: "background-color",
    transitionDuration: "0.2s",
    "& :hover": {
      backgroundColor: "#ededed",
    },
  },
}));
let timeout = null;
const Search = ({ className, searchButton, placeHolder, ...rest }) => {
  const state = useSelector((state) => state.solution);
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  const listRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const baseSolutionUrl = HOMEWORK_HELP;

  useEffect(() => {
    if (list.length > 0) {
      setList([]);
    }
  }, [router.asPath]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setVisible(false);
    }
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
    dispatch(queryChange(e.target.value));
    if (timeout) {
      clearTimeout(timeout);
      setList([]);
      setVisible(false);
    }
    timeout = setTimeout(() => {
      onTypeSearch(e.target.value);
    }, 1000);
  };

  const onTypeSearch = async (query) => {
    let resetTimeout;
    let value = 1;
    try {
      if (query) {
        if (resetTimeout) clearTimeout(resetTimeout);
        const solutionResponse = await solutionInstance.get("/elastic/search", {
          params: { query },
        });
        setList(solutionResponse.data.data);
        setVisible(true);
      } else {
        setList([]);
        setVisible(false);
        resetTimeout = setTimeout(() => {
          router.push({
            pathname: QUESTION_ANSWER,
          });
        }, 500);
      }
    } catch (e) {
      setList([]);
      setVisible(false);
    }
  };

  const onSearch = async () => {
    setList([]);
    try {
      router.push({
        pathname: QUESTION_ANSWER,
        query: {
          query: query,
        },
      });
    } catch (e) {}
  };

  const truncateString = (string) => {
    const rgxp = new RegExp(
      "(\\S*.{0,50})?(" + query + ")(.{0,50}\\S*)?",
      "ig"
    );
    // If you want to account for newlines, replace dots `.` with `[\\s\\S]`
    let results = "";
    string.replace(rgxp, function (match, $1, $2, $3) {
      results = `${results} ${$1 ? "…" + $1 : ""} ${
        "<span>" + $2 + "</span>"
      } ${$3 ? $3 + "…" : ""}`;
    });
    // return <p>{HtmlParser(results.slice(0, 300))}</p>;
    return <p>{HtmlParser(results.slice(0, 250))}</p>;
  };
  const RenderList = () => {
    return list.map((li, i) => {
      let searchedItem = truncateString(
        li.question.replace(/(<([^>]+)>)/gi, "")
      );
      return (
        <>
          <NextLink
            href={`${baseSolutionUrl}/${li?.bookslug}/${li.slug}`}
            passHref
          >
            <ListItem className={classes.listItem} key={i}>
              {searchedItem}
            </ListItem>
          </NextLink>
        </>
      );
    });
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={0}>
        <Grid item xs={8} sm={11} className={classes.grid}>
          <Paper className={classes.search} elevation={1}>
            <SearchIcon className={classes.searchIcon} />
            <Input
              className={classes.searchInput}
              disableUnderline
              placeholder={placeHolder ? placeHolder : "Search"}
              onChange={handleChange}
              value={query}
              onClick={() => setVisible(true)}
            />
            {list.length > 0 && visible && (
              <Paper elevation={1} ref={listRef} className={classes.list}>
                <Button
                  variant="text"
                  className={classes.seeAllBtn}
                  onClick={onSearch}
                  startIcon={<AddOutlined />}
                >
                  View All Answers
                </Button>
                <List className={classes.oneList}>{RenderList()}</List>
              </Paper>
            )}
          </Paper>
        </Grid>
        <Grid item xs={3} sm={1}>
          {searchButton === true ? (
            <Button
              className={classes.searchButton}
              onClick={onSearch}
              size="large"
              variant="contained"
            >
              Search
            </Button>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
};

export default Search;
