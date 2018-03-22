import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';
import { articleReducer } from 'kumparan_mobile/app/reducers/ArticleReducer';

const initialState = {
  q: '',
  sort: 'newest',
  requestType: 'init',
  data: [],
  isRequest: false
}

describe ('Article Reducer', function(){
  it('should return the initial state', function() {
      expect(articleReducer(initialState, {})).toEqual(initialState);
  });

  it("should react to an action with the type 'GET_ARTICLES_LIST_ERROR'", function() {
    const isRequest = false;
    expect(articleReducer(initialState, {
        type: ActionTypes.GET_ARTICLES_LIST_ERROR
    })).toEqual({...initialState, isRequest});
  });

  it("should react to an action with the type 'GET_ARTICLES_LIST_REQUEST'", function() {
    const isRequest = true;
    expect(articleReducer(initialState, {
        type: ActionTypes.GET_ARTICLES_LIST_REQUEST
    })).toEqual({...initialState, isRequest});
  });

  it("should react to an action with the type 'GET_ARTICLES_LIST_SUCCESS'", function() {
    const isRequest = false;
    const sort = 'newest';
    const q = '';
    const data = [{
        web_url:'https://www.nytimes.com/aponline/2018/03/21/us/ap-us-obit-bozo-the-clown-entertainer.html',
        snippet:'A longtime Boston television personality and entertainer known for playing Bozo the Clown has died at age 89.',
        blog:{},
        source:'AP',
        multimedia:[
        ],
        headline:{
            main:'TV Personality Known for Playing Bozo the Clown Dies at 89',
            kicker:null,
            content_kicker:null,
            print_headline:'TV Personality Known for Playing Bozo the Clown Dies at 89',
            name:null,
            seo:null,
            sub:null
        },
        keywords:[],
        pub_date:'2018-03-22T03:18:07+0000',
        document_type:'article',
        new_desk:'None',
        byline:{
            original:'By THE ASSOCIATED PRESS',
            person:[],
            organization:'THE ASSOCIATED PRESS'
        },
        type_of_material:'News',
        _id:'5ab32073068401528a29aa6b',
        word_count:132,
        score:1,
        uri:'nyt://article/b0e9f15b-7adc-57ee-ac84-104486b29602'
    }];
    page = 0;
    requestType = "init";
    expect(articleReducer(initialState, {
        type: ActionTypes.GET_ARTICLES_LIST_SUCCESS,
        sort,
        q,
        data,
        page,
        requestType
    })).toEqual({...initialState, isRequest, sort, q, data, page, requestType});
  });
});
