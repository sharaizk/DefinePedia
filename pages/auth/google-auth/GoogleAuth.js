import GoogleLogin from 'react-google-login'
import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux';
import { googleLogin } from '../../../src/store/actions/authActions';
import { useRouter } from 'next/router';

const GoogleAuth = (props) => {


  const router = useRouter();
  const dispatch = useDispatch();


  const handleGoogleAuth = async googleData => {
    dispatch(googleLogin(googleData.tokenId, router));
  }


  const logout = () => {

  }
  return (
    <Fragment>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText={props.label}
        scope='https://www.googleapis.com/auth/user.gender.read'
        onSuccess={handleGoogleAuth}
        onFailure={handleGoogleAuth}
        cookiePolicy={'single_host_origin'}
      // isSignedIn={true}
      />
    </Fragment>
  )
}

export default GoogleAuth
