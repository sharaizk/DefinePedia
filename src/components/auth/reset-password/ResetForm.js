import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { Button, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import clsx from 'clsx';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../../store/actions/authActions';
import * as yup from 'yup'
import useStyles from '../formStyles'

const ResetForm = (props) => {
  const { token } = props;
  const [showPass, setShowPass] = useState(false);

  const classes = useStyles();
  const schema = yup.object().shape({
    password: yup.string()
      .required('Password is required')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain 8 Characters, One Alphabet, One Number and one special case Character"),
    passwordConfirm: yup.string().required('Please Confirm Your Password').oneOf([yup.ref('password'), null], 'Password Does not match')
  })

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const dispatch = useDispatch();


  const onSubmit = (data) => {
    const newData = { token, ...data };
    console.log(newData);
    dispatch(resetPassword(newData));
  }


  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  return (
    <form
      className={clsx(classes.root, classes.resetForm)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={classes.fields}>

        <TextField
          error={errors.password ? true : false}
          fullWidth
          inputRef={register}
          helperText={
            (errors.password && errors.password?.message)
          }
          label="Password"
          name="password"
          type={showPass ? "text" : "password"}
          variant="outlined"
          InputProps={{
            endAdornment:
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                // onMouseDown={handleMouseDownPassword}
                >
                  {showPass ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
          }}
        />
        <TextField
          error={errors.passwordConfirm ? true : false}
          fullWidth
          inputRef={register}
          helperText={
            errors.passwordConfirm && errors.passwordConfirm?.message
          }
          label="Confirm Password"
          name="passwordConfirm"
          type={showPass ? "text" : "password"}
          variant="outlined"
        />
      </div>

      <Button
        className={classes.submitButton}
        color="secondary"
        size="large"
        type="submit"
        variant="contained"
      >
        Reset Password
  </Button>
    </form>
  )
}

export default ResetForm
