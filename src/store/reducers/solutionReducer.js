import { updateObject } from '../../utils/helperFunctions';
import * as actionTypes from '../constants/solutionConstants';


const initialState = {
  questions: [],
  page: 1,
  totalPages: 1,
  limit: 10,
  isLoading: false,
  totalSolutions:0,
  error: null,
  selectedSolution: null,
  query: "",
  isRelated:false
}

const questionSuccess = (state, action) => {
  return updateObject(state,
    {
      isLoading: false,
      questions: action.payload.data.data,
      error: null,
      totalPages: Math.ceil(action.payload.data.totalSolutions / state.limit),
      totalSolutions:action.payload.data.totalSolutions
    })
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.QUESTION_FETCH_START: { return updateObject(state, { isLoading: true, error: null }) }
    case actionTypes.QUESTION_FETCH_SUCCESS: { return questionSuccess(state, action) }
    case actionTypes.QUESTION_FETCH_FAIL: { return updateObject(state, { isLoading: false, error: action.error }) }
    case actionTypes.PAGE_CHANGE: { return updateObject(state, { page: action.payload.page }) }
    case actionTypes.QUERY_CHANGE:{return updateObject(state,{query:action.payload.query,isRelated:action.payload.isRelated})}
    default:
      return state;
  }
}

export default reducer;
