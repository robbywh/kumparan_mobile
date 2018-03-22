import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
// ASSETS
var logo = require('kumparan_mobile/app/assets/images/kumparan.png');
// MODULES
import Fade from 'kumparan_mobile/app/modules/FadeModule';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';

export default class SplashScreen extends Component {
  constructor() {
    super()
    this.state = {
      splashVisible: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ splashVisible: true })

      setTimeout(() => {
        this.setState({ splashVisible: false })
      }, this.props.splashTime - 500)
    }, 100)
  }

  render(){
    return(
      <View style={styles.container}>
        <Fade visible={this.state.splashVisible}>
          <Image source={logo} style={{height: 75}} resizeMode={'contain'} />
        </Fade>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:Color.WHITE,
    alignItems:'center',
    justifyContent:'center'
  }
})
