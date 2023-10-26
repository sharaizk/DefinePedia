import { updateObject } from '../../utils/helperFunctions';
import * as actionTypes from '../constants/authConstants';

const initialState = {
  token: null,
  user: null,
  error: null,
  loggedIn: false,
  isLoading: false,
  forgetPasswordLinkSent: false,
  resetPasswordCompleted: false
}


const authStart = (state, action) => {
  return updateObject(state, { error: null, isLoading: true });
}

const authFail = (state, action) => {
  return updateObject(state, { error: action.error, isLoading: false })
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.data.token,
    user: action.data.data.user,
    loggedIn: true,
    error: null,
    isLoading: false
  })
}


const forgotSuccess = (state, action) => {
  return updateObject(state, {
    error: null,
    isLoading: false,
    forgetPasswordLinkSent: true,
  })
}

const resetPassword = (state, action) => {
  return updateObject(state, {
    error: null,
    isLoading: false,
    resetPasswordCompleted: true
  })
}

const authenticateAutomatically = (state, action) => {
  console.log('authenticating automatically')
  return updateObject(state, {
    token: action.data.token,
    user: action.data.user,
    error: null,
    isLoading: false,
    loggedIn: true
  })
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START: return authStart(state, action);
    case actionTypes.LOGIN_FAIL: return authFail(state, action)
    case actionTypes.LOGIN_SUCCESS: return authSuccess(state, action)
    case actionTypes.LOGOUT: return updateObject(state, { token: null, user: null, loggedIn: false })
    case actionTypes.REGISTER_START: return authStart(state, action);
    case actionTypes.REGISTER_FAIL: return authFail(state, action)
    case actionTypes.REGISTER_SUCCESS: return authSuccess(state, action)
    case actionTypes.GOOGLE_START: return authStart(state, action);
    case actionTypes.GOOGLE_FAIL: return authFail(state, action)
    case actionTypes.GOOGLE_SUCCESS: return authSuccess(state, action)
    case actionTypes.FORGOT_PASSWORD_START: return authStart(state, action);
    case actionTypes.FORGOT_PASSWORD_FAIL: return authFail(state, action)
    case actionTypes.FORGOT_PASSWORD_SUCCESS: return forgotSuccess(state, action)
    case actionTypes.RESET_START: return authStart(state, action);
    case actionTypes.RESET_FAIL: return authFail(state, action)
    case actionTypes.RESET_SUCCESS: return resetPassword(state, action)
    case actionTypes.AUTO_AUTHENTICATE: return authenticateAutomatically(state, action)

    default:
      return state;
  }
}

export default reducer;
