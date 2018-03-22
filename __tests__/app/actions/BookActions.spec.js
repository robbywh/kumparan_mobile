import * as Actions from 'kumparan_mobile/app/actions/BookActions';
import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';
import { getListBooksApi } from 'kumparan_mobile/app/utils/KumparanApi';

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

describe('Book Actions', function() {
  describe('getBooksListError', function() {
    it('should have a type of GET_BOOKS_LIST_ERROR', function() {
      expect(Actions.getBooksListError().type).toEqual(ActionTypes.GET_BOOKS_LIST_ERROR);
    });
  });

  describe('getBooksListRequest', function() {
    it('should have a type of GET_BOOKS_LIST_REQUEST', function() {
      expect(Actions.getBooksListRequest().type).toEqual(ActionTypes.GET_BOOKS_LIST_REQUEST);
    });
  });

  describe('getBooksListSuccess', function() {
    it('should have a type of GET_BOOKS_LIST_SUCCESS', function() {
      const data = {
        offset: '',
        list: 'e-book-fiction',
        requestType: 'init',
        data: [{
            list_name:'E-Book Fiction',
            display_name:'E-Book Fiction',
            bestsellers_date:'2017-01-14',
            published_date:'2017-01-29',
            rank:1,
            rank_last_week:0,
            weeks_on_list:1,
            asterisk:0,
            dagger:0,
            amazon_product_url:'https://www.amazon.com/Full-Package-Lauren-Blakely-ebook/dp/B01MT5HMRV?tag=NYTBS-20',
            isbns:[],
            book_details:[
                {
                    title:'FULL PACKAGE',
                    description:'A man shares a cramped apartment with his friend\'s fetching sister.',
                    contributor:'by Lauren Blakely',
                    author:'Lauren Blakely',
                    contributor_note:'',
                    price:0,
                    age_group:'',
                    publisher:'Lauren Blakely',
                    primary_isbn13:'A00B01MT5HMRV',
                    primary_isbn10:'None'
                }
            ],
            reviews:[
                {
                    book_review_link:'',
                    first_chapter_link:'',
                    sunday_review_link:'',
                    article_chapter_link:''
                }
            ]
        }],
        type: ActionTypes.GET_ARTICLES_LIST_SUCCESS
      }
      expect(Actions.getBooksListSuccess().type).toEqual(ActionTypes.GET_BOOKS_LIST_SUCCESS);
      expect(Actions.getBooksListSuccess(data.list, data.offset, data.requestType, data.data).list).toEqual(data.list);
      expect(Actions.getBooksListSuccess(data.list, data.offset, data.requestType, data.data).offset).toEqual(data.offset);
      expect(Actions.getBooksListSuccess(data.list, data.offset, data.requestType, data.data).data).toEqual(data.data);
    });
  });

  describe('getBooksList', function(){
    it('status OK', function() {
      const params = {
        list: 'e-book-fiction',
        offset: 0,
        requestType: 'init'
      }
      const data = {
        status: 'OK',
        copyright:'Copyright (c) 2018 The New York Times Company. All Rights Reserved.',
        num_results:15,
        last_modified:'2017-03-21T13:38:01-04:00',
        results:[{
          list_name:'E-Book Fiction',
          display_name:'E-Book Fiction',
          bestsellers_date:'2017-01-14',
          published_date:'2017-01-29',
          rank:1,
          rank_last_week:0,
          weeks_on_list:1,
          asterisk:0,
          dagger:0,
          amazon_product_url:'https://www.amazon.com/Full-Package-Lauren-Blakely-ebook/dp/B01MT5HMRV?tag=NYTBS-20',
          isbns:[],
          book_details:[{
              title:'FULL PACKAGE',
              description:'A man shares a cramped apartment with his friend\'s fetching sister.',
              contributor:'by Lauren Blakely',
              author:'Lauren Blakely',
              contributor_note:'',
              price:0,
              age_group:'',
              publisher:'Lauren Blakely',
              primary_isbn13:'A00B01MT5HMRV',
              primary_isbn10:'None'
          }],
          reviews:[{
              book_review_link:'',
              first_chapter_link:'',
              sunday_review_link:'',
              article_chapter_link:''
          }]
        }]
      }

      mock.onGet(getListBooksApi(params)).reply(200, data)

      return store.dispatch(Actions.getBooksList(params, () => {
        expect(actions[0]).toEqual(Actions.getBooksListRequest())
        expect(actions[1]).toEqual(Actions.getBooksListSuccess(params.list, params.offset, params.requestType, data.results))
      }))
    })

    it('status FAIL', function() {
      new MockAdapter(axios);
      const params = {
        list: 'e-book-fiction',
        offset: 0,
      }
      const data = {
        status: 'FAIL',
      }

      return store.dispatch(Actions.getBooksList(params, () => {}, () => {
        expect(actions[2]).toEqual(Actions.getBooksListRequest())
        expect(actions[3]).toEqual(Actions.getBooksListError())
      }))
    })
  })

});
