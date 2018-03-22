import React, {Component} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Color from 'kumparan_mobile/app/utils/Color';
// OTHERS
import Icon from 'react-native-vector-icons/Ionicons';

export default class StackHeader extends Component {
  static defaultProps = {
    title:'',
    backTitle:'',
    borderBottom:true,
    rightType:'',
    leftType:''
  }

  constructor(props) {
    super(props);
    this.state = {
      title:this.props.title,
      backTitle:this.props.backTitle,
      borderBottom:this.props.borderBottom,
      rightType:this.props.rightType,
      leftType:this.props.leftType,
      flexLeft:1,
      flexCenter:4,
      flexRight:1
    }
  }

  componentDidMount() {
    if(this.state.title == '' && this.state.backTitle != '') {
      this.setState({flexLeft:3, flexCenter:1, flexRight:1})
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title:nextProps.title,
      rightType:nextProps.rightType,
      leftType:nextProps.leftType
    })
  }

  renderHeaderLeft() {
    if(this.props.onPressLeft == undefined) {
      return <View style={{flex:this.state.flexLeft}}/>;
    } else {
      return (
        <View style={{flex:this.state.flexLeft}}>
          <TouchableOpacity style={{flexDirection:'row'}} onPress={() => this.props.onPressLeft()}>
            {this.getSourceLeft()}
            <Text style={styles.backTitle}>{this.state.backTitle}</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


  getSourceLeft() {
    var source = <Icon name={'ios-arrow-back-outline'} size={30} color={Color.GREEN_TOSCA}/>;
    switch(this.state.leftType) {
      case 'close':
        source = <Icon name={'md-close'} size={30} color={Color.GREEN_TOSCA}/>;
        return source;
      default:
        return source;
    }
  }

  renderHeaderRight() {
    if(this.state.rightType == undefined || this.state.rightType == '') {
      return <View style={{flex:this.state.flexRight}}/>;
    } else {
      var right = this.getSource();
      return (
        <View style={{flex:this.state.flexRight, alignItems:'flex-end', justifyContent:'center'}}>
          <TouchableOpacity style={{flexDirection:'row', paddingRight:10}} onPress={() => this.props.onPressRight()}>
            {right}
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    return(
      <View style={[styles.header, {borderBottomWidth:this.state.borderBottom ? 1 : 0}]}>
        {this.renderHeaderLeft()}
        <View style={{flex:this.state.flexCenter}}><Text style={styles.headerTitle}>{this.state.title}</Text></View>
        {this.renderHeaderRight()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize:18,
    fontWeight:'bold',
    textAlign:'center',
    color:Color.GREEN_TOSCA
  },
  backTitle: {
    fontSize:18,
    textAlign:'center'
  },
  header: {
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:20,
    paddingTop:Platform.OS === 'ios' ? 30 : 20,
    flexDirection:'row',
    justifyContent:'center',
    backgroundColor:Color.VERY_LIGHT_GREEN,
    borderBottomWidth:1,
    borderColor:Color.GREEN_TOSCA
  },
  icBack: {
    height:30,
    marginTop:-5
  },
  icCloseScreen: {
    height:26,
    width:26
  }
});
