import React, {Component} from 'react';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';

export default class ImageKumparan extends Component {
  render() {
    return (
      <Image indicator={Progress.Circle}
        resizeMethod={'resize'}
        indicatorProps={{
          size:40,
          borderWidth:0,
          color:Color.GREEN_TOSCA,
          unfilledColor: Color.WHITE
        }}
        {...this.props}
      />
    )
  }
}
