import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Box, Grid, Card, Typography } from "@material-ui/core";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
  divider: {
    borderBottom: "1px solid #616161",
    margin: ".6rem 0",
  },
  imageContainer: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  bookEdition: {
    textAlign: "center",
    width: "100%",
    color: "#616161",
    fontSize: "0.75rem",
    fontFamily: "Manrope",
  },
  bookCard: {
    margin: ".4rem",
    padding: ".8rem .8rem .4rem .8rem",
    width: "100%",
    height: "auto",
  },
  bookTitle: {
    fontFamily: "Manrope",
    textAlign: "center",
    color: "black",
    height: "40px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#616161",
    fontSize: ".875rem",
    fontWeight: "bold",
  },
  bookDetail: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: ".2rem",
  },
  label: {
    fontFamily: "Manrope",
    fontWeight: "bold",
    color: "#9A0FBF",
    fontSize: "0.75rem",
  },
  labelDetail: {
    color: "#616161",
    fontSize: ".75rem",
    fontFamily: "Manrope",
  },
}));

const BookCard = ({
  title,
  author,
  publisher,
  year,
  edition,
  ISBN,
  image,
  direction,
}) => {
  const classes = useStyles();

  return (
    <Card className={classes.bookCard} elevation={3}>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={direction ? 12 : 5} className={classes.imageContainer}>
          <Image
            src={image}
            width={100}
            height={150}
            style={{ borderRadius: "8px", height: "100%", alignSelf: "center" }}
          />
          <Typography
            className={classes.bookEdition}
          >{`${edition} Edition`}</Typography>
        </Grid>
        <Grid
          item
          xs={direction ? 12 : 7}
          justifyContent="space-between"
          direction="column"
        >
          <Typography className={classes.bookTitle}>{title}</Typography>
          <Box className={classes.divider}></Box>
          <Box className={classes.bookDetail}>
            <Typography className={classes.label}>Auhtor:</Typography>
            <Typography className={classes.labelDetail}>{author}</Typography>
          </Box>
          <Box className={classes.bookDetail}>
            <Typography className={classes.label}>ISBN:</Typography>
            <Typography className={classes.labelDetail}>{ISBN}</Typography>
          </Box>
          <Box className={classes.bookDetail}>
            <Typography className={classes.label}>Publisher:</Typography>
            <Typography className={classes.labelDetail}>{publisher}</Typography>
          </Box>
          <Box className={classes.bookDetail}>
            <Typography className={classes.label}>Year:</Typography>
            <Typography className={classes.labelDetail}>{year}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default BookCard;
