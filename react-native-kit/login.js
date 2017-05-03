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
import { StackNavigator } from 'react-navigation';
import Home from './home';
class Login extends React.Component {
  static navigationOptions = {
    title: '登陆',
  }
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { navigate } = this.props.navigation;
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
            onPress={() => navigate('Home')}
            title="登录"
            color="#03a9f4"
          />
        </View>
      </Image>
    );
  }
}
const LoginStack = StackNavigator({
  Login: {
    screen: Login
  },
  Home: {
    screen: Home
  }
},{
  initialRouteName: 'Login',
  headerMode: 'none',
});
export default LoginStack;
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
