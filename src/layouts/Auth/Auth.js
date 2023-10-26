import React, { Fragment, Suspense } from 'react';
// import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { LinearProgress, Typography } from '@material-ui/core';

import Topbar from './components/Topbar';

const useStyles = makeStyles(theme => ({
  content: {
    height: '100%',
    paddingTop: 56,
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  }
}));

const AuthLayout = ({ children }) => {

  const classes = useStyles();

  return (
    <Fragment>
      <Topbar />
      <main className={classes.content}>
        {/* {renderRoutes(route.routes)} */}
        {children}
      </main>
    </Fragment>
  );
};

// AuthLayout.propTypes = {
//   route: PropTypes.object
// };

export default AuthLayout;
