import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';

const initialState = {
  list: 'e-book-fiction',
  requestType: 'init',
  offset: 0,
  data: [],
  isRequest: false
}

const getBookData = (state, action) => {
  let data;
  if(action.offset > 0) {
    data = state.data.concat(action.data);
  } else {
    data = action.data;
  }
  return data;
}


export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_BOOKS_LIST_ERROR:
      return {
        ...state,
        isRequest:false
      }
    case ActionTypes.GET_BOOKS_LIST_REQUEST:
      return {
        ...state,
        isRequest:true
      }
    case ActionTypes.GET_BOOKS_LIST_SUCCESS:
      return {
        ...state,
        isRequest:false,
        data: getBookData(state, action),
        offset: action.offset,
        requestType: action.requestType
      }
    default:
      return state;
  }
}
