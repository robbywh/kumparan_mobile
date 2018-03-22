import React, { Component } from 'react';
// ACTIONS
import * as ActionTypes from './ActionTypes';
// UTILS
import * as Constants from 'kumparan_mobile/app/utils/Constants';
import { getListBooksApi } from 'kumparan_mobile/app/utils/KumparanApi';
// OTHERS
import axios from 'axios';

const initialFilter = (obj) => ({
  "list": obj.list || "e-book-fiction",
  "offset": obj.offset || 0,
  "requestType": obj.requestType || "init"
})


export const getBooksListError = () => ({
  type: ActionTypes.GET_BOOKS_LIST_ERROR
})

export const getBooksListRequest = () => ({
  type: ActionTypes.GET_BOOKS_LIST_REQUEST
})

export const getBooksListSuccess = (list, offset, requestType, data) => ({
  type: ActionTypes.GET_BOOKS_LIST_SUCCESS,
  list,
  offset,
  requestType,
  data
})

export const getBooksList = (obj, onSuccess, onError) => {
  return (dispatch) => {
    let params = initialFilter(obj);
    dispatch(getBooksListRequest());
    return axios({
      url:getListBooksApi(params),
      method:'GET',
      responseType:'json',
      timeout:Constants.TIMEOUT
    })
    .then(json => {
      let responseData = json.data;
      if(responseData.status == "OK") {
        dispatch(getBooksListSuccess(params.list, params.offset, params.requestType, responseData.results));
        if(onSuccess != undefined) onSuccess(responseData.results)
      } else {
        dispatch(getBooksListError());
        console.log("Error getBooksList");
        if(onError != undefined) onError()
      }
    })
    .catch(error => {
      dispatch(getBooksListError());
      console.log(`Error getBooksList: ${error}`);
      if(onError != undefined) onError()
    })
  }
}
