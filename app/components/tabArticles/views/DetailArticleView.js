import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native';
// MODULES
import StackHeader from 'kumparan_mobile/app/modules/StackHeader';
// NACHOS-UI
import { Spinner } from 'nachos-ui';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';
import {deviceWidth, deviceHeight} from 'kumparan_mobile/app/utils/CommonUtil';


type Props = {};
export default class DetailArticleView extends Component<Props> {
  static navigationOptions = ({navigation}) => ({
    header: <StackHeader
      onPressLeft={() => {
        navigation.goBack();
      }}
      title={'Article Detail'}/>
  })

  constructor(props) {
    super(props);
    this.state = {
      web_url: this.props.navigation.state.params.web_url || ""
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.web_url != "" ?
          <WebView
           startInLoadingState={true}
           renderLoading={() => <View style={styles.container}><Spinner color={Color.GREEN_TOSCA}/></View>}
           style={{width:deviceWidth, height:deviceHeight}}
           source={{uri: this.state.web_url}}
          /> : <Text>NO WEB URL</Text>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:Color.WHITE
  }
});
