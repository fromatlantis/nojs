/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  TouchableHighlight,
  Platform
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './login';
const lbs = StackNavigator({
  Login: { 
    screen: Login
  }
},{
  //initialRouteName: 'Login', 
  headerMode: 'none',
  //mode: Platform.OS === 'ios' ? 'modal' : 'card'
});

AppRegistry.registerComponent('lbs', () => lbs);
