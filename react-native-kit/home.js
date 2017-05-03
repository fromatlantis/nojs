import React from 'react';
import {
    View,
    Text,
    Image,
    Navigator,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    Platform,
    Dimensions
} from 'react-native';
import {
  createNavigator,
  createNavigationContainer,
  TabRouter,
  addNavigationHelpers,
  StackNavigator
} from 'react-navigation';
import Mlist from './mlist';
import Plist from './plist';
import Profile from './profile';
const CustomTabBar = ({
  navigation,
  curRouteName
}) => {
  const { routes } = navigation.state;
  return (
    <View style={styles.tabBar}>
        {routes.map(route => (
            <View style={route.routeName == '+' ? styles.tabBarItemPlus : styles.tabBarItem } key={route.routeName}>
                <TouchableOpacity
                onPress={() => {
                        if(route.routeName != curRouteName){
                            navigation.navigate(route.routeName);
                        }
                    }
                }
                >
                <Text style = {route.routeName == curRouteName ? styles.tabBarTextCurrent : styles.tabBarText}>{route.routeName}</Text>
                </TouchableOpacity>
            </View>
        ))}
    </View>
  );
}

const CustomTabView = ({
  router,
  navigation,
}) => {
  const { routes, index } = navigation.state;
  const ActiveScreen = router.getComponentForState(navigation.state);
  return (
    <View style={styles.container}>
      <ActiveScreen
        navigation={addNavigationHelpers({
          ...navigation,
          state: routes[index],
        })}
      />
       <CustomTabBar navigation={navigation} curRouteName={routes[index].routeName}/>
    </View>
  );
};

const CustomTabRouter = TabRouter({
  '首页': {
    screen: Plist,
  },
  '采集': {
    screen: Mlist
  },
  '+': {
    screen: Mlist,
  },
  '导航':{
    screen: Mlist,
  },
  '我的':{
    screen: Mlist,
  }
}, {
  // Change this to start on a different tab
  initialRouteName: '首页',
});
//注意屌用顺序，必须按顺序书写
const CustomTabs = createNavigationContainer(createNavigator(CustomTabRouter)(CustomTabView));
//Stack和Custom组合
const PlistStack = StackNavigator({
    Root: {
        screen: CustomTabs
    },
    Mlist: {
        screen: Mlist
    }
});
export default PlistStack;
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 0 : 20, //或者配置android的translucent为true，从物理顶端开始显示
    },
    barContainer: {
        // 容器需要添加direction才能变成让子元素flex
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? 0 : 20, //或者配置android的translucent为true，从物理顶端开始显示
        backgroundColor: 'rgba(0,0,255,.1)',
        zIndex: 1   //注意图片的resizeMode并不会改变原有的占位，导致覆盖掉barContainer，事件无法起作用。推荐图片指定宽高，则不用加zIndex属性
    },
    cell: {
        flex: 1,
        height: 40,
        justifyContent: 'center'
    },
    barLeft: {
        textAlign: 'left'
    },
    barTitle: {
        textAlign: 'center'
    },
    barRight: {
        textAlign: 'right'
    },
    cellfixed: {
        height: 40,
        width: 80,
        justifyContent: 'center',
        paddingLeft: 8,
        paddingRight: 8
    },
    listContainer: {
        paddingLeft: 15
    },
    listItem: {
        flexDirection: 'row',
        height: 80,
        borderBottomWidth:1,
        borderColor: '#ebebeb',
    },
    listIcon: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: 60,
        height: 60
    },
    listDes: {
        flex: 1,
        justifyContent: 'center'
    },
    des: {
        marginLeft: 10,
        marginBottom: 5
    },
    tabBar: {
        flexDirection:'row',
        borderTopWidth: 1,
        borderColor: '#ccc'
    },
    tabBarItem: {
        flex: 1,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBarItemPlus: {
        height: 50,
        width: 50,
        borderColor:'#ccc',
        borderWidth: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -25,
        backgroundColor:'#fff'
    },
    tabBarItemPlusText: {
        fontSize: 20
    },
    tabBarText: {
        //color:'#555'
    },
    tabBarTextCurrent: {
        color:'red'
    }
});
