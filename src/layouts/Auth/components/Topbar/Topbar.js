import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  },
  title: {
    color: '#ffffff',
    textDecoration: 'none'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
    >
      <Toolbar>
        <Typography variant="h3">
          <Link href="/" passHref>
            <a className={classes.title}>
              DEFINE PEDIA
            </a>
          </Link>
        </Typography>
      </Toolbar>
    </AppBar >
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;