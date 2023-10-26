import React, { useState } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { toast } from "react-toastify";
import publicIp from "public-ip";

import Img from "public/images/section5.png";

import waitingListInstance from "src/axios-instances/waitingListInstance";

const useStyles = makeStyles((theme) => ({
  section5: {
    minHeight: "45vh",
    height: "100%",
    maxHeight: "100%",
    padding: "1.6rem",
    backgroundImage: `url(${Img.src})`,
    backgroundSize: "cover",
    bacgkroundPosition: "center,center",
    borderRadius: "16px",
    position: "relative",
  },
  ctaTitle: {
    color: "#FFFFFF",
    fontFamily: "Manrope,sans-serif",
    fontWeight: 700,
    fontSize: "2rem",
    lineHeight: "2rem",
    marginBottom: "2vh",
    width: "16ch",
    [theme.breakpoints.down("md")]: {
      fontSize: "1.6rem",
    },
  },
  CTAButton: {
    backgroundColor: "#18191F",
    color: "#FFF",
    fontFamily: "Manrope,sans-serif",
    borderRadius: 0,
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&:hover": {
      backgroundColor: "#18191F",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  CTAButtonContainer: {
    [theme.breakpoints.up("lg")]: {
      height: "100%",
    },
  },
  loader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "1000",
  },
}));

const useTextField = makeStyles((theme) => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fff",
    padding: "0.5rem 1rem",
    [theme.breakpoints.down("md")]: {
      marginBottom: "1vh",
    },

    "&:hover": {
      backgroundColor: "#fff",
    },
    "&$focused": {
      backgroundColor: "#fff",
      borderColor: theme.palette.primary.main,
    },
  },
  container: {
    "& > .MuiFormControl-root": {
      width: "100%",
    },
  },
}));

const MemberSection = () => {
  const classes = useStyles();
  const textClass = useTextField();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const getMemberEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const sendEmailInWaitingList = async (e) => {
    e.preventDefault();
    if (email) {
      const toastid = toast.loading("processing");
      try {
        setLoading(true);
        const ipAddress = await publicIp.v4();
        const emailResponse = await waitingListInstance.post("/add-email", {
          email: email,
          ipAddress: ipAddress,
        });
        setEmail("");
        toast.update(toastid, {
          render: `A confirmation email will be sent soon`,
          type: "success",
          isLoading: false,
          autoClose: 3000,
        });
        setLoading(false);
      } catch (error) {
        setEmail("");

        toast.update(toastid, {
          render: error.response.data.message || `Something went wrong`,
          type: "error",
          isLoading: false,
          autoClose: 3000,
        });

        setLoading(false);
      }
    }
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      className={classes.section5}
    >
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        xs={12}
        md={3}
      >
        <img src={"/images/section5I.png"} alt="Envelope-Illustration" />
      </Grid>
      <Grid item container xs={12} md={4}>
        <Grid className={classes.left} item xs={12}>
          <Typography className={classes.ctaTitle}>
            Join 2000 More People For Tutorship
          </Typography>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          xs={12}
        >
          <Grid item xs={12} md={6} className={textClass.container}>
            <TextField
              InputProps={{
                classes: textClass,
                disableUnderline: true,
              }}
              type="email"
              placeholder="Your work email address"
              value={email}
              onChange={getMemberEmail}
            />
          </Grid>
          <Grid item xs={12} md={6} className={classes.CTAButtonContainer}>
            <Button
              variant="contained"
              className={classes.CTAButton}
              onClick={sendEmailInWaitingList}
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : "Become A Member"}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MemberSection;
