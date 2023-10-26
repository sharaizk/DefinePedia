import { Typography, Card } from "@mui/material";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "500px",
    padding: "4rem 2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
    background: "#F0EAFA",
  },
  heading: {
    width: "100%",
    textAlign: "center",
    fontWeight: "bold",
    letterSpacing: "1px",
    color: "#8C30F5",
  },
  icon: {
    transform: "scale(2)",
    color: "#8C30F5",
  },
  info: {
    textAlign: "center",
    fontSize: "1rem",
    marginTop:'1rem',
    lineHeight:'1.5rem',
  },
}));

const EmailResponse = ({ heading, Icon, info }) => {
  const classes = useStyles();

  return (
    <Card className={classes.container}>
      <Typography variant="h4" className={classes.heading}>
        {heading}
      </Typography>
      <Icon className={classes.icon} />
      <Typography className={classes.info}>{info}</Typography>
    </Card>
  );
};

export default EmailResponse;
