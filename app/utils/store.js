// REDUX
import {
  applyMiddleware,
  combineReducers,
  createStore
} from 'redux';
import thunk from 'redux-thunk';
// NAVIGATION
import { createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';
import { NavigatorTab } from '../components/tabBar/navigationConfiguration';
// REDUCERS
import { articleReducer } from 'kumparan_mobile/app/reducers/ArticleReducer';
import { bookReducer } from 'kumparan_mobile/app/reducers/BookReducer';

const NavMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav,
)
let middleware = [thunk, NavMiddleware]

export default createStore(
  combineReducers({
    tabBar: (state,action) => NavigatorTab.router.getStateForAction(action,state),
    article: articleReducer,
    book: bookReducer
  }),
  applyMiddleware(...middleware)
)
