import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';

const initialState = {
  list: 'e-book-fiction',
  data: [],
  isRequest: false
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
        data: action.data,
        page: action.page
      }
    default:
      return state;
  }
}
