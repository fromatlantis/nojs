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
  Navigator
} from 'react-native';
import Login from './login';

export default class lbs extends Component {

  render() {
    let defaultName = 'FirstPageComponent';
    let defaultComponent = Login;
    return (
    <Navigator
      initialRoute={{ name: defaultName, component: defaultComponent }}
      configureScene={(route) => {
        return Navigator.SceneConfigs.HorizontalSwipeJump;
      }}
      renderScene={(route, navigator) => {
        let Component = route.component;
        //延展操作符一般用于属性的批量赋值上。在JSX中，可以使用…运算符，表示将一个对象的键值对与ReactElement的props属性合并。
        return <Component {...route.params} navigator={navigator} />
      }} />
    );
  }
}

AppRegistry.registerComponent('lbs', () => lbs);
