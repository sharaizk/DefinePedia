import PropTypes from "prop-types";
import { Grid, Card, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import NextLink from "next/link";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: ".8rem",
  },
  textContainer: {
    display: "flex",
    gap: ".2rem",
    alignItems: "flex-start",
    width: "100%",
  },
  questionText: {
    fontWeight: 600,
    fontFamily: "Manrope",
  },
  text: {
    fontSize: "0.8rem",
  },
  questionHeading: {
    marginRight: ".2rem",
  },
}));

const RelatedQuestion = (props) => {
  const classes = useStyles();
  const { title, href } = props;
  return (
    <Card className={classes.root} elevation={0}>
      <NextLink href={href} passHref>
        <a>
          <Grid container item xs={12} direction="row ">
            <Grid item xs={1}>
              <FileCopyIcon color="primary" style={{ fontSize: "14px" }} />
            </Grid>
            <Grid item container direction="column" spacing={2} xs={11}>
              <Grid item className={classes.textContainer}>
                <Typography
                  className={[
                    classes.questionText,
                    classes.text,
                    classes.questionHeading,
                  ]}
                  color="primary"
                  variant="h6"
                >
                  Q:
                </Typography>
                <Typography
                  className={[classes.questionText, classes.text]}
                  color="primary"
                >
                  {title}
                </Typography>
              </Grid>
              <Grid item className={classes.textContainer}>
                <Typography
                  className={[
                    classes.questionText,
                    classes.text,
                    classes.questionHeading,
                  ]}
                  color="primary"
                  variant="body2"
                >
                  A:
                </Typography>
                <Typography className={classes.text}>{title}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </a>
      </NextLink>
    </Card>
  );
};

RelatedQuestion.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};
export default RelatedQuestion;
