import React, {Component} from 'react';
import { BackHandler } from 'react-native';
// NAVIGATION
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { NavigatorTab } from '../navigationConfiguration';
// REDUX
import { connect } from 'react-redux';
import { createReduxBoundAddListener } from 'react-navigation-redux-helpers';
const addListener = createReduxBoundAddListener("root");

const mapStateToProps = (state) => {
  return {
    navigationState: state.tabBar
  }
}

type Props = {};
class TabBarNavigation extends Component<Props> {
  render() {
    const { dispatch, navigationState } = this.props;
    return (
      <NavigatorTab
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
            addListener
          })
        }
      />
    )
  }
}

export default connect(mapStateToProps)(TabBarNavigation)
