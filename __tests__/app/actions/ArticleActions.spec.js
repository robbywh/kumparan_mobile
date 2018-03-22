import * as Actions from 'kumparan_mobile/app/actions/ArticleActions';
import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';
import { getListArticlesApi } from 'kumparan_mobile/app/utils/KumparanApi';

// axios mock
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
var mock = new MockAdapter(axios);

// store mock
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
var store = mockStore({});
const actions = store.getActions();

describe('Article Actions', function() {
  describe('getArticlesListError', function() {
    it('should have a type of GET_ARTICLES_LIST_ERROR', function() {
      expect(Actions.getArticlesListError().type).toEqual(ActionTypes.GET_ARTICLES_LIST_ERROR);
    });
  });

  describe('getArticlesListRequest', function() {
    it('should have a type of GET_ARTICLES_LIST_REQUEST', function() {
      expect(Actions.getArticlesListRequest().type).toEqual(ActionTypes.GET_ARTICLES_LIST_REQUEST);
    });
  });

  describe('getArticlesListSuccess', function() {
    it('should have a type of GET_ARTICLES_LIST_SUCCESS', function() {
      const data = {
        q: '',
        sort: 'newest',
        data: [{
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
        }],
        page: 0,
        requestType: 'init',
        type: ActionTypes.GET_ARTICLES_LIST_SUCCESS
      }
      expect(Actions.getArticlesListSuccess().type).toEqual(ActionTypes.GET_ARTICLES_LIST_SUCCESS);
      expect(Actions.getArticlesListSuccess(data.requestType, data.q, data.sort, data.page, data.data).data).toEqual(data.data);
      expect(Actions.getArticlesListSuccess(data.requestType, data.q, data.sort, data.page, data.data).q).toEqual(data.q);
      expect(Actions.getArticlesListSuccess(data.requestType, data.q, data.sort, data.page, data.data).sort).toEqual(data.sort);
      expect(Actions.getArticlesListSuccess(data.requestType, data.q, data.sort, data.page, data.data).page).toEqual(data.page);
      expect(Actions.getArticlesListSuccess(data.requestType, data.q, data.sort, data.page, data.data).requestType).toEqual(data.requestType);
    });
  });

  describe('getArticlesList', function(){
    it('status OK', function() {
      const params = {
        q: '',
        sort: 'newest',
        page: 0,
        requestType: 'init'
      }
      const data = {
        status: 'OK',
        copyright:'Copyright (c) 2018 The New York Times Company. All Rights Reserved.',
        response:{
          docs:[{
              web_url:'https://www.nytimes.com/reuters/2018/03/22/business/22reuters-best-buy-huawei.html',
              snippet:'Best Buy Co Inc, the largest U.S. consumer electronics retailer, will cut ties with China\'s Huawei Technologies Co Ltd [HWT.UL], a person familiar with the matter said, amid heightened scrutiny on Chinese tech firms in the United States.',
              blog:{
              },
              source:'Reuters',
              multimedia:[],
              headline:{
                  main:'U.S. Retailer Best Buy Cuts Ties With China\'s Huawei: Source',
                  kicker:null,
                  content_kicker:null,
                  print_headline:'U.S. Retailer Best Buy Cuts Ties With China\'s Huawei: Source',
                  name:null,
                  seo:null,
                  sub:null
              },
              keywords:[],
              pub_date:'2018-03-22T04:54:37+0000',
              document_type:'article',
              new_desk:'None',
              byline:{
                  original:'By REUTERS',
                  person:[],
                  organization:'REUTERS'
              },
              type_of_material:'News',
              _id:'5ab33710068401528a29aafd',
              word_count:364,
              score:1,
              uri:'nyt://article/c525fbaa-4ebc-570c-bb3d-7ef0a0ac6362'
          }]
        }
      }

      mock.onGet(getListArticlesApi(params)).reply(200, data)

      return store.dispatch(Actions.getArticlesList(params, () => {
        expect(actions[0]).toEqual(Actions.getArticlesListRequest())
        expect(actions[1]).toEqual(Actions.getArticlesListSuccess(params.requestType, params.q, params.sort, params.page, data.response.docs))
      }))
    })

    it('status FAIL', function() {
      new MockAdapter(axios);
      const params = {
        q: '',
        sort: 'newest',
        page: 0,
        requestType: 'init'
      }
      const data = {
        status: 'FAIL',
      }

      return store.dispatch(Actions.getArticlesList(params, () => {}, () => {
        expect(actions[2]).toEqual(Actions.getArticlesListRequest())
        expect(actions[3]).toEqual(Actions.getArticlesListError())
      }))
    })
  })
});
