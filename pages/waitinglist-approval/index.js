import { makeStyles } from "@material-ui/styles";

import Page from "src/components/shared/Page";
import { Handshake } from "@mui/icons-material";
import EmailResponse from "src/components/waitinglist-approval/EmailResponse";
import waitingListInstance from "src/axios-instances/waitingListInstance";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "6.5rem 2rem 0 2rem",
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    position: "relative",
  },
  loaderWrapper: {
    width: "100vw",
    height: "90vh",
    maxWidth: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    background: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loader: {
    color: "#8C30F5",
  },
}));

const VerifyEmail = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root}>
      <EmailResponse
        heading="Congratulations"
        Icon={Handshake}
        info="Your email has been approved.
              You will be the first one to get the news of latest content.
              Thank you for joining Definepedia"
      />
    </Page>
  );
};

export async function getServerSideProps({ query }) {
  const { token } = query;

  try {
    await waitingListInstance.post("/email-verify", {
      token: token,
    });

    return {
      props: {},
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: `http://localhost:5700/404`,
      },
    };
  }
}

export default VerifyEmail;
