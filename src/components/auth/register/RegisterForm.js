import React, { Fragment, useState } from 'react';
import NextLink from 'next/link';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Button,
  Checkbox,
  FormHelperText,
  TextField,
  Typography,
  Link,
  Radio,
  FormControlLabel,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@material-ui/core';

import { useRouter } from 'next/router';
import useStyles from '../formStyles';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import RadioInputGroup from '../../shared/RadioInputGroup/RadioInputGroup';
import { signUp } from '../../../store/actions/authActions'
import * as yup from "yup";
// import { yupResolver } from '@hookform/resolvers/yup'
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { Visibility, VisibilityOff } from '@material-ui/icons';



const RegisterForm = props => {

  const [showPass, setShowPass] = useState(false);

  const schema = yup.object().shape({
    firstName: yup.string().required('First Name is Required').min(3, "Minimum 3 Characters"),
    lastName: yup.string().required('Last Name is Required').min(3, "Minimum 3 Characters"),
    email: yup.string().required('Email is Required').email('Please Enter a Valid Email'),
    // lastName: yup.number().positive().integer().required(),
    password: yup.string()
      .required('Password is required')
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Must Contain 8 Characters, One Alphabet, One Number and one special case Character"),
    passwordConfirm: yup.string().required('Please Confirm Your Password').oneOf([yup.ref('password'), null], 'Password Does not match'),
    gender: yup.string().required('Please select your gender'),
    role: yup.string().required('Please select your role'),
    policy: yup.boolean().required('Plesae accept the policy').oneOf([true, null], "You must agree to Terms & Conditions")
  });



  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const { register, handleSubmit, watch, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const state = useSelector(state => state.auth);
  const { className, ...rest } = props;

  const [fromData, updateFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    gender: '',
    role: '',
    policy: ''
  });

  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    updateFormData(watch());
    dispatch(signUp(data, router));
    if (state.error) {
      updateFormData(watch());
    }
  }



  if (state.loggedIn) {
    router.push('/')
  }

  let form = (<form
    {...rest}
    className={clsx(classes.root, className)}
    onSubmit={handleSubmit(onSubmit)}
  >
    <div className={classes.fields}>
      <TextField
        error={errors.firstName ? true : false}
        helperText={
          (errors.firstName && errors.firstName?.message)
        }
        label="First name"
        type="text"
        name="firstName"
        inputRef={register}
        variant="outlined"
      />
      <TextField
        error={errors.lastName ? true : false}
        helperText={
          (errors.lastName && errors.lastName?.message)
        }
        label="Last name"
        type="text"
        name="lastName"
        inputRef={register}
        variant="outlined"
      />
      <TextField
        error={errors.email ? true : false}
        fullWidth
        inputRef={register}
        helperText={errors.email && errors.email?.message}
        label="Email address"
        name="email"
        type="email"
        variant="outlined"
      />
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
            <InputAdornment position="end" >
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
      <div>

        <section>
          <RadioInputGroup
            error={errors.gender}
            name="gender"
            label="Gender"
            helperText={errors.gender && errors.gender?.message}
          >
            <FormControlLabel value="male" control={<Radio inputRef={register} />} label="Male" />
            <FormControlLabel value="female" control={<Radio inputRef={register} />} label="Female" />
          </RadioInputGroup>
        </section>

        <section>
          <RadioInputGroup
            error={errors.role}
            name="role"
            label="Register As"
            helperText={errors.role && errors.role?.message}
          >
            <FormControlLabel value="student" control={<Radio inputRef={register} />} label="Student" />
            <FormControlLabel value="tutor" control={<Radio inputRef={register} />} label="Tutor" />
          </RadioInputGroup>
        </section>
      </div>
      <div>
        <div className={classes.policy}>
          <Checkbox
            className={classes.policyCheckbox}
            color="primary"
            name="policy"
            inputRef={register}
          />
          <Typography
            color="textSecondary"
            variant="body1"
          >
            I have read the{' '}
            <NextLink href="#">

              <Link
                color="secondary"
                underline="always"
                variant="h6"
              >
                Terms and Conditions
            </Link>
            </NextLink>
          </Typography>
        </div>
        {errors.policy && (
          <FormHelperText error>{errors.policy?.message}</FormHelperText>
        )}
      </div>
    </div>
    <Button
      className={classes.submitButton}
      color="secondary"
      size="large"
      type="submit"
      variant="contained"
    >
      Create account
  </Button>
  </form>);


  if (state.isLoading)
    form = <CircularProgress size="9rem" />


  return (
    <Fragment>
      <Typography
        varient="body1"
        color="error"
      >
        {state.error ? state.error.data.message : null}
      </Typography>
      {form}
    </Fragment>
  );
};

RegisterForm.propTypes = {
  className: PropTypes.string
};

export default RegisterForm;
