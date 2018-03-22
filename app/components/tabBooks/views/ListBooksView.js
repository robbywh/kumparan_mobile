import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native';

// ACTIONS
import { getBooksList } from 'kumparan_mobile/app/actions/BookActions';
// MODULES
import Image from 'kumparan_mobile/app/modules/ImageKumparan';
// NACHOS-UI
import { Spinner, Switcher, SegmentedControlButton } from 'nachos-ui';
// REDUX
import { connect } from 'react-redux';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';
import CommonUtil, {deviceWidth} from 'kumparan_mobile/app/utils/CommonUtil';
import * as Constants from 'kumparan_mobile/app/utils/Constants';
// OTHERS
import Icon from 'react-native-vector-icons/Ionicons';
import dismissKeyboard from 'dismissKeyboard';

const mapStateToProps = (state) => {
  var {offset, data, list, isRequest} = state.book || {offset:0, data:[], list:'e-book-fiction', isRequest:false};

  return {
    offset,
    data,
    list,
    isRequest
  }
};

type Props = {};
class ListBooksView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      offset: this.props.offset,
      data: this.props.data,
      list: this.props.list,
      isRequest: this.props.isRequest
    }
  }

  componentDidMount() {
    this._getBooksListData();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      offset: nextProps.offset,
      data: nextProps.data,
      list: nextProps.list,
      isRequest: nextProps.isRequest
    })
  }

  _keyExtractor = (item, index) => index.toString();

  _getBooksListData(onSuccess, onError) {
    const { dispatch } = this.props.navigation;
    let params = {
      list:this.state.list || 'e-book-fiction',
      offset:this.state.offset || 0
    }
    dispatch(getBooksList(params, () => {
      if(onSuccess != undefined) onSuccess()
    }, () => {
      if(onError != undefined) onError()
    }));
  }

  _renderItem = ({item, index}) => {
    return (
      <View key={index} style={{flexDirection:'row', width:deviceWidth, padding:20}}>
        <View style={{flex:4, paddingLeft:10}}>
          <Text style={{fontSize:12}}>{item.list_name}</Text>
          <Text style={{color:Color.DARK_BLACK}}>{item.book_details.length > 0 ? item.book_details[0].title : "NO TITLE"}</Text>
          <Text style={{fontSize:10, textAlign:'right'}}>{item.published_date}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
          <Icon name="ios-arrow-forward-outline" size={25} color={Color.GREEN_TOSCA}/>
        </View>
      </View>
    )
  }

  render() {
    return (
        <View style={styles.container}>
          <View style={styles.headerSearch}>
            <Switcher
              defaultSelected={0}
              style={[styles.containerSearch, {width:deviceWidth-40}]}
              onChange={list => {
                setTimeout(() => {
                  this.setState({ list, offset:0 });
                  this._getBooksListData();
                },10)
              }}
              direction='row'>
              <SegmentedControlButton value='e-book-fiction' text='E-book Fiction' />
              <SegmentedControlButton value='hardcover-fiction' text='Hardcover Fiction' />
           </Switcher>
          </View>
          <View style={styles.container}>
          {
            this.state.isRequest ? <Spinner color={Color.GREEN_TOSCA}/> :
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              enableEmptySections={true}
              ItemSeparatorComponent={() => <View style={styles.separator}/>}
            />
          }
        </View>
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
  },
  separator: {
    borderColor: Color.LIGHT_GREEN,
    borderBottomWidth: 1
  },
  headerSearch: {
    width: deviceWidth,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Color.GREEN_TOSCA,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Color.LIGHT_GREEN,
    flexDirection: 'row'
  },
  containerSearch: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center'
  }
});

export default connect(mapStateToProps)(ListBooksView);
