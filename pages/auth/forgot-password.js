import { Button, Card, CardContent, CircularProgress, TextField, Typography } from '@material-ui/core'
import React, { Fragment, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../src/components/shared/Page';
import useStyles from '../../styles/authStyles';
import { forgotPassword } from '../../src/store/actions/authActions';

const { makeStyles } = require("@material-ui/styles");


// const useStyles = makeStyles(theme => ({
//   submitButton: {
//     marginTop: theme.spacing(2),
//     width: '100%'
//   }
// }))

const ForgotPassword = () => {
  const classes = useStyles();

  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(forgotPassword(data));
  }

  useEffect(() => {

  }, [])

  const state = useSelector(state => state.auth);
  let content = (<form onSubmit={handleSubmit(onSubmit)}>
    <TextField
      inputRef={register({ required: [true, 'Email is required to reset the password'] })}
      error={errors.email ? true : false}
      name="email"
      type="email"
      fullWidth
      helperText={errors.email && errors.email?.message}
      label="Email Address"
      variant="outlined"
    />

    <Button
      color="secondary"
      size="large"
      type="submit"
      variant="contained"
      className={classes.submitButton}
    >
      Submit
  </Button>

  </form>)

  if (state.isLoading) {
    content = <CircularProgress size="9rem" className={classes.spinner} />
  }

  if (state.forgetPasswordLinkSent) {
    content =
      <Typography variant="body2">
        Password Reset link sent to your email. Please Check your email to reset your password
    </Typography>
  }
  return (
    <Card className={classes.smallCard}>
      <CardContent className={classes.content}>
        <Typography className={classes.center} gutterBottom variant="h3">
          Reset Password
        </Typography>
        <Page className={classes.root} title="Login">
          {content}
        </Page>
      </CardContent>
    </Card>
  )
}

export default ForgotPassword;
