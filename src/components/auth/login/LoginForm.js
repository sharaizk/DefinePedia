import React, { Fragment } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../formStyles';
import { Button, CircularProgress, Divider, TextField, Typography } from '@material-ui/core';
import { login } from '../../../store/actions/authActions';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { useRouter } from 'next/router'

const LoginForm = props => {
    const { className, ...rest } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);

    const schema = yup.object().shape({
        email: yup.string().required('Email is Required').email('Please Enter a Valid Email'),
        password: yup.string()
            .required('Password is required')
    });

    const { register, handleSubmit, watch, errors } = useForm({
        resolver: yupResolver(schema)
    });
    const router = useRouter();



    const watchAll = watch();

    const onSubmit = async (data) => {
        console.log(data)
        dispatch(login(data.email, data.password, router));
    }

    const content = () => {

        if (state.isLoading) {
            return <CircularProgress size="9rem" className={classes.spinner} />
        }
        else {
            return (
                <Fragment>
                    <form
                        {...rest}
                        className={clsx(classes.root, className)}
                        onSubmit={handleSubmit(onSubmit)}
                    >

                        <div className={classes.fields}>
                            <TextField
                                name="email"
                                inputRef={register}
                                error={errors.email ? true : false}
                                helperText={(errors.email?.type === 'required' && "Email is required") || (errors.email?.type === 'pattern' && "Please Enter a valid Email Address")}
                                fullWidth
                                type="email"
                                label="Email address"
                                variant="outlined"
                            />
                            <TextField
                                name="password"
                                inputRef={register}
                                fullWidth
                                error={errors.password ? true : false}
                                helperText={
                                    (errors.password?.type === "required" && "Password Cannot be empty") || (errors.password?.type === "pattern" && "Password must have atleast a 8 character, upper case, number and a special character")
                                }
                                autoComplete="on"
                                label="Password"
                                type="password"
                                variant="outlined"
                            />
                            <Button
                                className={classes.submitButton}
                                color="secondary"
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Sign in
              </Button>
                        </div>
                    </form>
                    <Divider variant="middle" className={classes.divider} />
                </Fragment>
            )
        }
    }

    return content();
};

LoginForm.propTypes = {
    className: PropTypes.string
};

export default LoginForm;
