import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  FlatList
} from 'react-native';
// MODULES
import StackHeader from 'kumparan_mobile/app/modules/StackHeader';
// UTILS
import Color from 'kumparan_mobile/app/utils/Color';
// OTHERS
import Icon from 'react-native-vector-icons/Ionicons';

export default class ModalSort extends Component {
  static defaultProps = {
    data:[],
    title:'',
    visible:false,
    currentValue:'',
    onPressList:() => {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      title: this.props.title,
      visible: this.props.visible,
      currentValue: this.props.currentValue,
      onPressList: this.props.onPressList
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title,
      visible: nextProps.visible,
      currentValue: nextProps.currentValue
    })
  }

  renderListContent(item) {
    return(
      <TouchableOpacity onPress={() => this.state.onPressList(item.type)} style={{paddingTop:20, paddingBottom:20, borderBottomWidth:1, borderColor:Color.PALE_GREY}}>
        <View style={styles.listItemContainerSearch}>
          <View style={{flex:5}}>
            <Text style={[styles.listTextBig,{marginBottom:5}]}>{item.name}</Text>
          </View>
          <View style={{flex:0.5}} >
            {
              item.type == this.state.currentValue  ?
              <Icon name='md-checkmark' size={25} style={[styles.iconCheckmark, {textAlign:"right"}]}/>
              : <View/>
            }
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
          onRequestClose={() => console.log('close')}
          >
           <View>
            <StackHeader
              leftType={'close'}
              onPressLeft={() => {
                this.setState({visible:false})
              }}
              title={this.state.title}/>
              <View style={{paddingLeft:20, paddingRight:20}}>
                <FlatList
                  scrollEnabled={false}
                  keyExtractor={(item, index) => item.type}
                  data={this.state.data}
                  renderItem={({item}) => this.renderListContent(item)}
                />
              </View>
            </View>
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconCheckmark: {
    flex:1,
    color:Color.FUN_BLUE
  },
  listItemContainerSearch: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  listTextBig: {
    fontSize:18,
    color:Color.CHARCOAL_GREY
  }
});
