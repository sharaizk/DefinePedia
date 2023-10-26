import * as actionTypes from '../constants/solutionConstants';
import solutionInstance from '../../axios-instances/solution'


const questionFetchStart = () => {
  return { type: actionTypes.QUESTION_FETCH_START }
}


const questionFetchFail = (error) => {
  return { type: actionTypes.QUESTION_FETCH_FAIL, error }
}

const questionFetchSuccess = (data) => {
  return { type: actionTypes.QUESTION_FETCH_SUCCESS, payload: { data } }
}

export const questionFetch = (page, limit,query,isRelated) => dispatch => {
  dispatch(questionFetchStart());
  const path=query?'/elastic/search':'/'
  let queryParam={
    params:{
      page,
      limit
    }
  }
  if(query){
    queryParam={
      params:{
        page,
        limit,
        query,
        isRelated
      }
    }
  }
  solutionInstance.get(path,queryParam).then(result => {
    // console.log(result.data)
    dispatch(questionFetchSuccess(result.data))
  }).catch(err => {
    dispatch(questionFetchFail(err));
  })
}

export const setInitialQuestions = (questions, totalSolutions) => dispatch => {
  //Set the initial questions loaded by the server side rendering
  dispatch(questionFetchSuccess({
    data: questions,
    totalSolutions
  }))

}

export const categorySearch= (page,limit,filter)=>async (dispatch)=>{
  try{
    dispatch(questionFetchStart());
    const categorySearchResponse=await solutionInstance.get("/category/search",{
      params:{
        page,
        limit,
        category:filter
      }
    })
    dispatch(questionFetchSuccess(categorySearchResponse.data))
  }
  catch(e){
    dispatch(questionFetchFail(e))
  }
}

export const pageChange = (page) => dispatch => {
  dispatch({ type: actionTypes.PAGE_CHANGE, payload: { page } })
}

export const queryChange=(query,isRelated=false)=>dispatch=>{
  dispatch({type:actionTypes.QUERY_CHANGE, payload:{query:query,isRelated:isRelated}})
}