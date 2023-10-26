import { Card, CardContent, Divider, Link as MuiLink, Typography } from '@material-ui/core';
import React from 'react'
import { useRouter } from 'next/router'
import useStyles from '../../styles/authStyles';
import NextLink from 'next/link'
import { useSelector } from 'react-redux';
import ResetForm from '../../src/components/auth/reset-password/ResetForm';
import Page from '../../src/components/shared/Page';

const ResetPassword = () => {

  const classes = useStyles();
  const router = useRouter();
  const token = router.query.token;
  const state = useSelector(state => state.auth);

  let cardContent = (
    <CardContent className={classes.content}>
      <Typography className={classes.center} gutterBottom variant="h3">
        Reset Password
    </Typography>

      <Typography className={classes.center} variant="subtitle2">
        Enter your new password to reset your password
    </Typography>

      <ResetForm token={token}></ResetForm>

      <Divider className={classes.divider} />
    </CardContent>
  )

  if (state.resetPasswordCompleted) {
    cardContent =
      (<CardContent className={classes.content}>
        <Typography className={classes.center} gutterBottom variant="h3">
          Password Reset Successful
      </Typography>

        <Typography className={classes.center} variant="subtitle2">
          Your password has been reset successfully, please click
          <NextLink href="/auth/login" passHref>
            <MuiLink
              align="center"
              color="secondary"
              underline="always"
              variant="subtitle2"
            >
              here
          </MuiLink>
          </NextLink>
         to login
    </Typography>

        <Divider className={classes.divider} />
      </CardContent>
      );
  }

  return (
    <Page className={classes.root} title="Reset Password">
      <Card className={classes.smallCard}>
        {cardContent}
      </Card>
    </Page>
  )
}

export default ResetPassword;
