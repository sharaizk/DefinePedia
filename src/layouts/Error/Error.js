import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const ErrorLayout = props => {
  const { children } = props;

  const classes = useStyles();

  return (
    <main className={classes.root}>
      {children}
    </main>
  );
};

export default ErrorLayout;