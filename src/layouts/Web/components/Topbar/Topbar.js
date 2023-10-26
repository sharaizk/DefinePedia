/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import NextLink from "next/link";
import clsx from "clsx";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { makeStyles, ThemeProvider } from "@material-ui/styles";
import {
  AppBar,
  Badge,
  Button,
  IconButton,
  Toolbar,
  Hidden,
  Input,
  colors,
  Popper,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  Typography,
  createMuiTheme,
} from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import NotificationsIcon from "@material-ui/icons/NotificationsOutlined";
import InputIcon from "@material-ui/icons/Input";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
// import { PricingModal, NotificationsPopover } from 'components';
import { logout } from "../../../../store/actions/authActions";
import { LockOpen } from "@material-ui/icons";
import { Search } from "src/components/shared/SearchBar/components";
import { HOMEWORK_HELP_QNA } from "src/utils/constants";
import Modal from "../Model/Model";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "0px 2px #E5E9F2",
    backgroundColor: "#ffffff",
  },
  flexGrow: {
    flexGrow: 1,
  },
  search: {
    flexBasis: 300,
    height: 36,
    padding: theme.spacing(0, 2),
    marginRight: "16px",
    display: "flex",
    alignItems: "center",
    borderColor: theme.palette.primary.main,
    borderRadius: 5,
    borderWidth: 2,
  },
  logoutButton: {
    marginLeft: theme.spacing(1),
  },
  logoutIcon: {
    marginRight: theme.spacing(1),
  },
  title: {
    ...theme.typography.mavenPro,
    color: colors.purple["A400"],
    paddingLeft: "2em",
    cursor: "pointer",
  },
  menuItems: {
    cursor: "pointer",

    paddingLeft: "12px",
    paddingRight: "12px",
    "& li": {
      display: "inline-block",
      paddingLeft: "16px",
      paddingRight: "16px",
    },
  },
}));

const TopBar = (props) => {
  const { onOpenNavBarMobile, className, ...rest } = props;

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <div style={{ flexGrow: 0.1 }} />
        <NextLink href="/">
          <Typography className={classes.title} variant="h3">
            DefinePedia.
          </Typography>
        </NextLink>
        <Hidden smDown>
          <ul className={classes.menuItems}>
            <li>
              <NextLink href={HOMEWORK_HELP_QNA}>
                <Typography color="textSecondary" variant="h6">
                  Learn
                </Typography>
              </NextLink>
            </li>
            <li>
              <Typography color="textSecondary" variant="h6">
                Study Help
              </Typography>
            </li>
            <li>
              <Typography color="textSecondary" variant="h6">
                Find A Tutor
              </Typography>
            </li>
            <li>
              <Typography color="textSecondary" variant="h6">
                Blog
              </Typography>
            </li>
          </ul>
        </Hidden>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <Search
            placeHolder="Type Your Question here"
            className={classes.search}
            searchButton={false}
          />
        </Hidden>
        <Hidden mdDown>
          <Modal />
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onOpenNavBarMobile}>
            <MenuIcon />
          </IconButton>
        </Hidden>
        <div style={{ flexGrow: 0.2 }} />
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onOpenNavBarMobile: PropTypes.func,
};

export default TopBar;
