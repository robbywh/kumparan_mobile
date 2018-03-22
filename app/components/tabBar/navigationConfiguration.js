import React, {Component} from 'react';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color'

// VIEWS
import ListArticlesView from '../tabArticles/views/ListArticlesView';

const navigateOnce = (getStateForAction) => (action, state) => {
  const {type, routeName} = action;
  return (
    state &&
    type === NavigationActions.NAVIGATE &&
    routeName === state.routes[state.routes.length - 1].routeName
  ) ? state : getStateForAction(action, state);
};

// =================================================================================
// TAB BOOKS
// =================================================================================
import ListBooksView from '../tabBooks/views/ListBooksView';
import DetailBookView from '../tabBooks/views/DetailBookView';

const NavigatorTabBooks = StackNavigator({
  DetailBookView: {
    screen: DetailBookView,
    navigationOptions: {
      tabBarVisible:false
    }
  },
  ListBooksView: {
     screen: ListBooksView,
     navigationOptions: {
       header: null
     }
   },
}, {
  headerMode: 'screen',
  mode: 'card',
  initialRouteName: 'ListBooksView'
})

NavigatorTabBooks.router.getStateForAction = navigateOnce(NavigatorTabBooks.router.getStateForAction);

// =================================================================
// TAB BAR
// =================================================================

const routeConfiguration = {
  TabArticlesNavigation: {
    screen: ListArticlesView,
    navigationOptions: {
      tabBarLabel: 'Articles',
      tabBarIcon: ({ focused }) => {
        return focused ? <Icon name="md-paper" size={25} color={Color.DARK_GREEN}/> : <Icon name="md-paper" size={25} color={Color.GREEN_TOSCA}/>
      }
    }
  },
  TabBooksNavigation: {
    screen: NavigatorTabBooks,
    navigationOptions: {
      tabBarLabel: 'Books',
      tabBarIcon: ({ focused }) => {
        return focused ? <Icon name="md-book" size={25} color={Color.DARK_GREEN}/> : <Icon name="md-book" size={25} color={Color.GREEN_TOSCA}/>
      }
    }
  }
}

const tabBarConfiguration = {
  initialRouteName: 'TabArticlesNavigation',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: Color.DARK_GREEN,
    inactiveTintColor: Color.GREEN_TOSCA,
    tabStyle: {borderTopWidth:1, borderColor:Color.LIGHT_GREEN, backgroundColor:Color.WHITE},
    labelStyle: {fontWeight:'bold', fontSize:12}
  }
}

export const NavigatorTab = TabNavigator(routeConfiguration, tabBarConfiguration);
