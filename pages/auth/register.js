import React from 'react';
import NextLink from 'next/link';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link as MuiLink,
  Avatar
} from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAddOutlined';

import useStyles from '../../styles/authStyles';
import GoogleAuth from './google-auth/GoogleAuth';
import RegisterForm from 'src/components/auth/register/RegisterForm';
import Page from 'src/components/shared/Page';

const Register = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Register"
    >
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <PersonAddIcon className={classes.icon} />
          <Typography
            gutterBottom
            variant="h3"
          >
            Sign up
          </Typography>
          <Typography variant="subtitle2">
            Sign up on the internal platform
          </Typography>
          <Divider className={classes.divider} />
          <GoogleAuth label="Sign Up With Google" />
          <Typography variant="subtitle2">
            OR
          </Typography>
          <Divider className={classes.divider} />

          <RegisterForm className={classes.registerForm} />
          <Divider className={classes.divider} />


          <NextLink href="/auth/login" passHref>
            <MuiLink
              align="center"
              color="secondary"
              underline="always"
              variant="subtitle2"
            >
              Have an account?
            </MuiLink>
          </NextLink>
        </CardContent>
        <CardMedia
          className={classes.media}
          image="/images/studying-online-from-home.jpg"
          title="Cover"
        >
        </CardMedia>
      </Card>
    </Page>
  );
};

export default Register;
