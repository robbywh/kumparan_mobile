import React, { Component } from 'react';
// ACTIONS
import * as ActionTypes from './ActionTypes';
// UTILS
import * as Constants from 'kumparan_mobile/app/utils/Constants';
import { getListArticlesApi } from 'kumparan_mobile/app/utils/KumparanApi';
// OTHERS
import axios from 'axios';

const initialFilter = (obj) => ({
  "q": obj.q || "",
  "sort": obj.sort || "newest",
  "page": obj.page || 0
})

export const getArticlesListError = () => ({
  type: ActionTypes.GET_ARTICLES_LIST_ERROR
})

export const getArticlesListRequest = () => ({
  type: ActionTypes.GET_ARTICLES_LIST_REQUEST
})

export const getArticlesListSuccess = (q, sort, page, data) => ({
  type: ActionTypes.GET_ARTICLES_LIST_SUCCESS,
  q,
  sort,
  page,
  data
})

export const getArticlesList = (obj, onSuccess, onError) => {
  return (dispatch) => {
    let params = initialFilter(obj);
    dispatch(getArticlesListRequest());
    return axios({
      url:getListArticlesApi(params),
      method:'GET',
      responseType:'json',
      timeout:Constants.TIMEOUT
    })
    .then(json => {
      let responseData = json.data;
      if(responseData.status == "OK") {
        dispatch(getArticlesListSuccess(params.q, params.sort, params.page, responseData.response.docs));
        if(onSuccess != undefined) onSuccess()
      } else {
        dispatch(getArticlesListError());
        console.log("Error getArticlesList");
        if(onError != undefined) onError()
      }

    })
    .catch(error => {
      dispatch(getArticlesListError());
      console.log(`Error getArticlesList: ${error}`);
      if(onError != undefined) onError()
    })
  }
}
