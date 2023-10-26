import React, { Fragment, useEffect } from 'react';
import NextLink from 'next/link';
import useStyles from '../../styles/authStyles';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Divider,
    Link as MuiLink,
} from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Page from '../../src/components/shared/Page/index';
import GoogleAuth from './google-auth/GoogleAuth';
import { useSelector } from 'react-redux';
import ForgotPassword from './forgot-password';
import { useRouter } from 'next/router'
import LoginForm from '../../src/components/auth/login/LoginForm';

const Login = () => {

    // Get the state from redux
    const state = useSelector(state => state.auth);
    const classes = useStyles();
    useEffect(() => {



    }, [])
    let forgotPassword = false;

    const router = useRouter();
    if (state.loggedIn) {
        router.replace('/')
    }

    let renderContent = (
        <Fragment>
            <Typography
                variant="body1"
                color="error"
            >
                {state.error ? state.error.data.message : null}
            </Typography>
            <LoginForm className={classes.loginForm} />
            <NextLink href='/auth/forgot-password' passHref>
                <MuiLink
                    underline="always"
                    variant="subtitle2"
                    color="error">
                    Forgot Password?
                    </MuiLink>
            </NextLink>
            <Divider className={classes.divider} />

            <GoogleAuth label="Login With Google" />
        </Fragment>
    );


    if (router.pathname === '/auth/forgot-password') {
        renderContent = <ForgotPassword className={classes.forgotPassword} />
        forgotPassword = true;
    }


    return (
        <Page className={classes.root} title="Login">
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <LockOpenIcon className={classes.icon} />
                    <Typography gutterBottom variant="h3">
                        {forgotPassword && !state.forgetPasswordLinkSent ?
                            'Forgot Password' :
                            state.forgetPasswordLinkSent ?
                                'Password Reset Successfully' :
                                'Sign In'}
                    </Typography>

                    <Typography variant="subtitle2">
                        {forgotPassword && !state.forgetPasswordLinkSent ?
                            'Enter Your Email to Reset Your Password' :
                            state.forgetPasswordLinkSent ?
                                '' :
                                'to your Definepedia account'}
                    </Typography>

                    {renderContent}

                    <Divider className={classes.divider} />

                    <NextLink href="/auth/register" passHref>
                        <MuiLink
                            align="center"
                            color="secondary"
                            underline="always"
                            variant="subtitle2"
                        >
                            Don't have an account?
                            </MuiLink>
                    </NextLink>
                </CardContent>
                <CardMedia
                    className={classes.media}
                    image="/images/definepedia-login-page-image.jpg"
                    title="The Hub of education - Definepedia "
                >
                    <Typography color="secondary" variant="h2">
                        The Definition of Education
          </Typography>
                </CardMedia>
            </Card>
        </Page >
    );  
};

export async function getServerSideProps(context) {
    // console.log(localStorage.getItem("token"))
    // console.log({ cookie: context.req })
    return {
        props: {

        }
    }
}

export default Login;
