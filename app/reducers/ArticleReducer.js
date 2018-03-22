import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';

const initialState = {
  q: '',
  sort: 'newest',
  requestType: 'init',
  data: [],
  isRequest: false
}

const getArticleData = (state, action) => {
  let data;
  if(state.q == action.q && action.page > 0) {
    data = state.data.concat(action.data);
  } else {
    data = action.data;
  }
  return data;
}

export const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ARTICLES_LIST_ERROR:
      return {
        ...state,
        isRequest:false
      }
    case ActionTypes.GET_ARTICLES_LIST_REQUEST:
      return {
        ...state,
        isRequest:true
      }
    case ActionTypes.GET_ARTICLES_LIST_SUCCESS:
      return {
        ...state,
        isRequest:false,
        q: action.q,
        sort: action.sort,
        data: getArticleData(state, action),
        page: action.page,
        requestType: action.requestType
      }
    default:
      return state;
  }
}
