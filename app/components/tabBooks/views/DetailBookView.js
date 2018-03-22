import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';

// MODULES
import StackHeader from 'kumparan_mobile/app/modules/StackHeader';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';

type Props = {};
export default class DetailBookView extends Component<Props> {
  static navigationOptions = ({navigation}) => ({
    header: <StackHeader
      onPressLeft={() => {
        navigation.goBack();
      }}
      title={'Book Detail'}/>
  })

  constructor(props) {
    super(props);
    this.state = {
      book_details: this.props.navigation.state.params.book_details || []
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView scrollEventThrottle={200} showsVerticalScrollIndicator={false} contentContainerStyle={{padding:20}}>
          <Text style={styles.title}>
            {this.state.book_details.length > 0 ? this.state.book_details[0].title : ""}
          </Text>
          <Text style={{textAlign:'justify'}}>
            {this.state.book_details.length > 0 ? this.state.book_details[0].description : ""}
          </Text>
        </ScrollView>
        <View style={styles.footer}>
          <View style={{flex:1}}>
            <Text style={{fontSize:12, color:Color.DARK_BLACK}}>Publisher :</Text>
            <Text>{this.state.book_details.length > 0 ? this.state.book_details[0].publisher : ""}</Text>
          </View>
          <View style={{flex:1}}>
            <Text style={{fontSize:12, textAlign:'right', color:Color.DARK_BLACK}}>Author :</Text>
            <Text style={{textAlign:'right'}}>{this.state.book_details.length > 0 ? this.state.book_details[0].author : ""}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.WHITE,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom:10,
    color:Color.DARK_BLACK
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  footer: {
    flexDirection:'row',
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20,
    paddingTop:Platform.OS === 'ios' ? 30 : 20,
    backgroundColor:Color.VERY_LIGHT_GREEN,
    borderTopWidth:1,
    borderColor:Color.GREEN_TOSCA
  }
});
