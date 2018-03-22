import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';

export default class LoadingComponent extends Component {
  render() {
    return (
      <View style={[styles.container, {backgroundColor:this.props.backgroundColor ? this.props.backgroundColor : Color.WHITE}]}>
        <ActivityIndicator
          animating={true}
          size="large"
          color={Color.GREEN_TOSCA}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})
