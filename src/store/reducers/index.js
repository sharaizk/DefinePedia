import { combineReducers } from 'redux';

import authReducer from './authReducer';
import sessionReducer from './sessionReducer'
import solutionReducer from './solutionReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  session: sessionReducer,
  solution: solutionReducer
});

export default rootReducer;
