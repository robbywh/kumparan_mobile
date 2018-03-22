import React, { Component } from 'react';
// ACTIONS
import * as ActionTypes from './ActionTypes';
// UTILS
import * as Constants from 'kumparan_mobile/app/utils/Constants';
import { getListBooksApi } from 'kumparan_mobile/app/utils/KumparanApi';
// OTHERS
import axios from 'axios';

export const getBooksListError = () => ({
  type: ActionTypes.GET_BOOKS_LIST_ERROR
})

export const getBooksListRequest = () => ({
  type: ActionTypes.GET_BOOKS_LIST_REQUEST
})

export const getBooksListSuccess = (list, data) => ({
  type: ActionTypes.GET_BOOKS_LIST_SUCCESS,
  list,
  data
})

export const getBooksList = (list, onSuccess, onError) => {
  return (dispatch) => {
    dispatch(getBooksListRequest());
    return axios({
      url:getListBooksApi(list),
      method:'GET',
      responseType:'json',
      timeout:Constants.TIMEOUT
    })
    .then(json => {
      let responseData = json.data;
      if(responseData.status == "OK") {
        dispatch(getBooksListSuccess(list, responseData.results));
        if(onSuccess != undefined) onSuccess()
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
