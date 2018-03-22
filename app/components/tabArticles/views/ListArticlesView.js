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
import { getArticlesList } from 'kumparan_mobile/app/actions/ArticleActions';
// MODULES
import Image from 'kumparan_mobile/app/modules/ImageKumparan';
import LoadingComponent from 'kumparan_mobile/app/modules/LoadingComponent';
import ModalSort from 'kumparan_mobile/app/modules/ModalSort';
// NACHOS-UI
import { Spinner } from 'nachos-ui';
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
  var {requestType, q, sort, page, data, isRequest } = state.article ||
    { requestType:"init", q:"", sort:"newest", page:0, data:[], isRequest:true }
  return {
    requestType,
    q,
    sort,
    page,
    data,
    isRequest
  }
}

type Props = {};
class ListArticlesView extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      q: "",
      sort: "newest",
      page: 0,
      data: this.props.data,
      isRequest: this.props.isRequest,
      showSort: false,
      dataSort: [{
        type:"newest",
        name:"Newest"
      }, {
        type:"oldest",
        name:"Oldest"
      }],
      currentSort:'newest',
      requestType: this.props.requestType,
      refreshing: false,
      endReached: false,
      lastPage: false,
    }
  }

  componentDidMount() {
    this._getArticlesListData();
  }

  _getArticlesListData(onSuccess, onError) {
    setTimeout(() => {
      const { dispatch } = this.props.navigation;
      let params = {
        q:this.state.q,
        sort:this.state.sort,
        page:this.state.page,
        requestType:this.state.requestType
      }
      dispatch(getArticlesList(params, (data) => {
        if(onSuccess != undefined) onSuccess(data)
      }, () => {
        if(onError != undefined) onError()
      }));
    }, 10);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      q: nextProps.q,
      sort: nextProps.sort,
      page: nextProps.page,
      isRequest: nextProps.isRequest,
      data: nextProps.data
    })
  }

  _keyExtractor = (item, index) => index.toString();

  _onSubmitEditing() {
    this.setState({page:0, requestType:'init'})
    this._getArticlesListData(() => {
      this.setState({failed:false})
    }, () => {
      this.setState({failed:true})
    });
    dismissKeyboard();
  }

  _renderItem = ({item}) => {
    let date= item.pub_date.split("+");
    let publishDate = new Date(date[0]);
    let image = <Icon name="md-image" size={50} color={Color.GREEN_TOSCA}/>;
    if(item.multimedia.length > 0 && item.multimedia[0].type == "image") {
      image = <Image style={{height:50, width:50}}
        source={{uri:`${Constants.BASE_URL}/${item.multimedia[0].url}`}}
        resizeMode={'cover'}/>
    }
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailArticleView', {web_url:item.web_url})} key={item._id} style={{flexDirection:'row', width:deviceWidth, padding:20}}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
          {image}
        </View>
        <View style={{flex:3, paddingLeft:10}}>
          <Text style={{color:Color.DARK_BLACK}}>{item.headline.main}</Text>
          <Text style={{fontSize:12}}>{publishDate.toLocaleString()}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center', alignItems:'flex-end'}}>
          <Icon name="ios-arrow-forward-outline" size={25} color={Color.GREEN_TOSCA}/>
        </View>
      </TouchableOpacity>
    )
  }

  _onEndReached() {
     this.setState({endReached: true});
     if(!this.state.lastPage) {
       this.setState({page:this.state.page + 1, requestType:'end'})
       this._getArticlesListData((data) => {
         if(data.length <= 0) this.setState({lastPage:true})
         this.setState({endReached: false});
       });
     } else {
       this.setState({endReached: false});
     }
  }

  _onRefresh() {
    if(!this.state.refreshing) {
      this.setState({page: 0, refreshing: true, requestType:'pull'});
      this._getArticlesListData(() => {
        this.setState({refreshing: false});
      })
    }
  }

  _sort(sortOrder) {
    this.setState({showSort:false, sort:sortOrder, page:0, requestType:'init'})
    this._getArticlesListData(() => {
      this.setState({currentSort:sortOrder});
    });
  }

  render() {
    return (
        <View style={styles.container}>
          <ModalSort
             data={this.state.dataSort}
             currentValue={this.state.currentSort}
             visible={this.state.showSort}
             title={'SORT'}
             onClose={() => this.setState({showSort:false})}
             onPressList={(sortOrder) => this._sort(sortOrder)}
           />
           <View style={styles.headerSearch}>
             <View style={[styles.containerSearch, {flex:3}]}>
               <Icon name={'ios-search-outline'} size={29} color={Color.WHITE}/>
               <TextInput
                 style={styles.txtSearch}
                 autoFocus={false}
                 blurOnSubmit={false}
                 autoCorrect={false}
                 underlineColorAndroid={'transparent'}
                 clearButtonMode="always"
                 placeholderTextColor={Color.WHITE}
                 placeholder={'Search'}
                 value={this.state.q}
                 onChangeText={(text) => {
                   this.setState({q: text})
                 }}
                 onSubmitEditing={() => this._onSubmitEditing()}
               />
            </View>
            <View style={{marginLeft:10, justifyContent:'center', alignItems:'flex-end'}}>
              <TouchableOpacity onPress={() => {
                this.setState({showSort: true})
              }}>
                <Text style={{color:Color.WHITE}}>SORT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.container}>
            {
              this.state.isRequest && this.state.requestType == "init" ? <Spinner color={Color.GREEN_TOSCA}/> :
              <FlatList
                data={this.state.data}
                extraData={this.state}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                enableEmptySections={true}
                refreshing={this.state.refreshing}
                onRefresh={!this.state.refreshing ? () => this._onRefresh() : () => {}}
                onEndReachedThreshold={0.5}
                onEndReached={() => !this.state.endReached && !this.state.lastPage ? this._onEndReached() : () => {}}
                ListFooterComponent={() => this.state.endReached && !this.state.noEndReached ?
                 <View style={styles.containerFooter}><LoadingComponent/></View> :
                 <View/>}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
              />
            }
          </View>
      </View>
    );
  }
}

export default connect(mapStateToProps)(ListArticlesView)

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
    backgroundColor: Color.WHITE_TRANSPARENT,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtSearch: {
    color: Color.WHITE,
    width: deviceWidth,
    marginLeft: 10,
    fontSize: 15,
    paddingBottom:5
  },
  containerFooter: {
    paddingTop:20,
    paddingBottom:20,
    borderColor:Color.VERY_LIGHT_GREEN,
    borderTopWidth:1
  }
});
