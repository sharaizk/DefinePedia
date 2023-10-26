import * as actionTypes from '../constants/authConstants';
import userInstance from '../../axios-instances/user';
import cookie from 'js-cookie'
import { signIn } from 'next-auth/client';

export const loginStart = () => {
  return { type: actionTypes.LOGIN_START }
}

export const loginSuccess = (data) => {
  return { type: actionTypes.LOGIN_SUCCESS, data }
}

export const loginFail = (error) => {
  return { type: actionTypes.LOGIN_FAIL, error }
}


export const logout = () => {
  return { type: actionTypes.LOGOUT }
}


export const authTimeOut = (expiresIn) => dispatch => {
  setTimeout(() => {
    dispatch(logout)
  }, expiresIn)
}



export const registerStart = () => {
  return { type: actionTypes.REGISTER_START }
}

export const registerFail = (error) => {
  return { type: actionTypes.REGISTER_FAIL, error }
}

export const registerSuccess = (data) => {
  return { type: actionTypes.REGISTER_SUCCESS, data }
}


export const googleStart = () => {
  return { type: actionTypes.GOOGLE_START }
}

export const googleFail = (error) => {
  return { type: actionTypes.GOOGLE_FAIL, error }
}

export const googleSuccess = (data) => {
  return { type: actionTypes.GOOGLE_SUCCESS, data }
}





export const signUp = (data, router) => async (dispatch) => {
  try {
    console.log(data)
    dispatch(registerStart());
    const response = await userInstance.post('/sign-up',data)
    dispatch(registerSuccess(response.data)) 
  } catch (error) {
    dispatch(registerFail(error.response))
  }
}

export const login = (email, password, router) =>async (dispatch) => {
  const authData = { email, password };
  dispatch(loginStart());
  try {
    const response = await userInstance.post('/sign-in', authData)
    console.log(response);
    dispatch(loginSuccess(response.data));
    signIn('credentials', {
      email, password
    })
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("userId", response.data.data.user._id)
    const cookieOptions = {
      expires: new Date(Date.now() + response.data.expiresIn)
    }
    // Set the client side cookies
    cookie.set('dpedia-token', response.data.token, cookieOptions)
    cookie.set("userId", response.data.data.user._id, cookieOptions)
    // router.push('/');
    dispatch(authTimeOut(response.data.expiresIn));

  } catch (error) {
    console.log(err);
    dispatch(loginFail(err.response));
  }
}

export const autoAuthenticate = () => dispatch => {
  const token = localStorage.getItem("token")
  const user = localStorage.getItem("user")
  if (token != "" || !token) {
    console.log("authenticating automatically")
    dispatch({
      type: actionTypes.AUTO_AUTHENTICATE, action: {
        data: {
          token,
          user
        }
      }
    })
  }


}

export const googleLogin = (token, router) => dispatch => {
  dispatch(googleStart());
  userInstance.post('/auth/google', {
    token
  }).then(response => {
    dispatch(googleSuccess(response.data));
    // router.history.push('/');
    dispatch(authTimeOut(response.data.expiresIn));
  }).catch(err => {
    dispatch(googleFail(err.response));
  });
}



export const forgotPasswordStart = () => {
  console.log("forgotpasswordstart");
  return { type: actionTypes.FORGOT_PASSWORD_START }
}

export const forgotPasswordFail = (error) => {
  return { type: actionTypes.FORGOT_PASSWORD_FAIL, error }
}

export const forgotPasswordSuccess = (data) => {
  return { type: actionTypes.FORGOT_PASSWORD_SUCCESS }
}



export const forgotPassword = (email) => dispatch => {
  dispatch(forgotPasswordStart());
  userInstance.post('/forget-password', email).then(response => {
    dispatch(forgotPasswordSuccess(response.data));
  }).catch(err => {
    dispatch(forgotPasswordFail(err.response));
  })
}





const resetPasswordStart = () => {
  return { type: actionTypes.RESET_START }
}

const resetPasswordFail = (error) => {
  return { type: actionTypes.RESET_FAIL, error }
}

const resetPasswordSuccess = (data) => {
  return { type: actionTypes.RESET_SUCCESS }
}

export const resetPassword = (data) => dispatch => {
  const { token, ...payload } = data;
  console.log(token, payload);
  dispatch(resetPasswordStart());
  userInstance.patch(`/reset-password/${token}`, payload).then(response => {
    dispatch(resetPasswordSuccess(response.data));
  }).catch(err => {
    resetPasswordFail(err)
  });
}
