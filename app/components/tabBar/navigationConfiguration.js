import React, {Component} from 'react';
import { TabNavigator, TabBarBottom, StackNavigator, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color'

// VIEWS
import ListArticlesView from '../tabArticles/views/ListArticlesView';
import ListBooksView from '../tabBooks/views/ListBooksView';

// =================================================================
// TAB BAR
// =================================================================

const routeConfiguration = {
  TabArticlesNavigation: {
    screen: ListArticlesView,
    navigationOptions: {
      tabBarLabel: 'Articles',
      tabBarIcon: ({ focused }) => {
        return focused ? <Icon name="md-paper" size={25} color={Color.GREEN_TOSCA}/> : <Icon name="md-paper" size={25} color={Color.BLACK}/>
      }
    }
  },
  TabBooksNavigation: {
    screen: ListBooksView,
    navigationOptions: {
      tabBarLabel: 'Books',
      tabBarIcon: ({ focused }) => {
        return focused ? <Icon name="md-book" size={25} color={Color.GREEN_TOSCA}/> : <Icon name="md-book" size={25} color={Color.BLACK}/>
      }
    }
  }
}

const tabBarConfiguration = {
  initialRouteName: 'TabArticlesNavigation',
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: Color.GREEN_TOSCA,
    inactiveTintColor: Color.BLACK,
    style: {borderTopWidth:1, borderColor:Color.GREEN_TOSCA, backgroundColor:Color.WHITE},
    labelStyle: {fontWeight:'bold', fontSize:12}
  }
}

export const NavigatorTab = TabNavigator(routeConfiguration, tabBarConfiguration);
