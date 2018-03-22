import * as ActionTypes from 'kumparan_mobile/app/actions/ActionTypes';
import { bookReducer } from 'kumparan_mobile/app/reducers/BookReducer';

const initialState = {
  list: 'e-book-fiction',
  requestType: 'init',
  offset: 0,
  data: [],
  isRequest: false
}


describe ('Book Reducer', function(){
  it('should return the initial state', function() {
      expect(bookReducer(initialState, {})).toEqual(initialState);
  });

  it("should react to an action with the type 'GET_BOOKS_LIST_ERROR'", function() {
    const isRequest = false;
    expect(bookReducer(initialState, {
        type: ActionTypes.GET_BOOKS_LIST_ERROR
    })).toEqual({...initialState, isRequest});
  });

  it("should react to an action with the type 'GET_BOOKS_LIST_REQUEST'", function() {
    const isRequest = true;
    expect(bookReducer(initialState, {
        type: ActionTypes.GET_BOOKS_LIST_REQUEST
    })).toEqual({...initialState, isRequest});
  });

  it("should react to an action with the type 'GET_BOOKS_LIST_SUCCESS'", function() {
    const isRequest = false;
    const list = 'e-book-fiction';
    const data = [{
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
    }];
    const offset = 0;
    const requestType = "init";
    expect(bookReducer(initialState, {
        type: ActionTypes.GET_BOOKS_LIST_SUCCESS,
        list,
        data,
        offset,
        requestType
    })).toEqual({...initialState, isRequest, list, data, offset, requestType});
  });
});
