/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  Image,
  Button,
  View,
  TouchableHighlight,
  AlertIOS,
  Dimensions
} from 'react-native';
import PList from './plist';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  _onPressLogin() {
    /**
    AlertIOS.alert('登录成功',null,[
      {text: '确定', onPress: ()=> console.log('点击确定')}
    ])
    **/
    const { navigator } = this.props;
    //为什么这里可以取得 props.navigator?请看上文:
    //<Component {...route.params} navigator={navigator} />
    //这里传递了navigator作为props
    if(navigator) {
        navigator.push({
            name: 'PList',
            component: PList,
        })
    }
  }
  render() {
    return (
       <Image source={require('./img/bg.jpg')}
            style={styles.imageBg} resizeMode='cover'>
        <View style={styles.container}>
          <Image source={require('./img/icon.png')}
            style={styles.image} resizeMode='contain'/>
          <View style={styles.textView}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="用户名"
              autoCorrect = {false}
            />
          </View>
          <View style={styles.textView}>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="密码"
              secureTextEntry = {true}
              autoCorrect = {false}
            />
          </View>
          <Button
            onPress={this._onPressLogin.bind(this)}
            title="登录"
            color="#03a9f4"
          />
        </View>
      </Image>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.9)',
    padding: 10
  },
  textView: {
    flexDirection: 'row'
  },
  input: {
    flex:1,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderColor:'#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 5
  },
  btn: {
    height:40,
    width:200,
    backgroundColor: 'rgba(0,255,0,.5)'
  },
  imageBg: {
    flex:1,
    width:Dimensions.get('window').width
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
