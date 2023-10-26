import React, { Suspense, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import TopBar from "./components/Topbar/Topbar";
import Footer from "./components/Footer/Footer";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 1 auto",
  },
}));

const WebLayout = (props) => {
  const { children } = props;
  const [openNavBarMobile, setOpenNavBarMobile] = useState(false);
  const classes = useStyles();
  const handleNavBarMobileOpen = () => {
    setOpenNavBarMobile(true);
  };
  return (
    <div className={classes.root}>
      <TopBar onOpenNavBarMobile={handleNavBarMobileOpen} />
      <main className={classes.content}>{children}</main>
      <Footer></Footer>
    </div>
  );
};

export default WebLayout;
