import React, { Component } from 'react';;
// REDUX
import { Provider } from 'react-redux';
import store from 'kumparan_mobile/app/utils/store';
// NAVIGATION
import TabBarNavigation from 'kumparan_mobile/app/components/tabBar/views/TabBarNavigation';
// SCREENS
import SplashScreen from 'kumparan_mobile/app/components/SplashScreen';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
      splashTime: 2000
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ splash: false })
    }, this.state.splashTime)
  }

  render() {
    if (this.state.splash) {
      return (
        <SplashScreen splashTime={this.state.splashTime} />
      )
    } else {
      return(
        <Provider store={store}>
          <TabBarNavigation />
        </Provider>
      )
    }
  }
}
