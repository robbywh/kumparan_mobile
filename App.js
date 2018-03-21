import React, { Component } from 'react';;
// REDUX
import { Provider } from 'react-redux';
import store from 'kumparan_mobile/app/utils/store';
// NAVIGATION
import TabBarNavigation from 'kumparan_mobile/app/components/tabBar/views/TabBarNavigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <TabBarNavigation />
      </Provider>
    );
  }
}
