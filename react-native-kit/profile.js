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
class Profile extends React.Component {
    static navigationOptions = {
        title: '信贷员列表',
    }
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0
        };
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.content}>
                <View style={styles.listContainer}>
                    <TouchableOpacity onPress={() => navigate('Mlist')}>
                        <View style={styles.listItem}>
                            <View style={styles.listIcon}>
                                <Image source={require('./img/icon.png')}
                                style={styles.image} resizeMode='contain'/>
                            </View>
                            <View style={styles.listDes}>
                                <Text style={styles.des}>信贷员A</Text>
                                <Text style={styles.des}>最新采集1</Text>
                            </View>      
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigate('Mlist')}>
                        <View style={styles.listItem}>
                            <View style={styles.listIcon}>
                                <Image source={require('./img/icon.png')}
                                style={styles.image}/>
                            </View>
                            <View style={styles.listDes}>
                                <Text style={styles.des}>信贷员A</Text>
                                <Text style={styles.des}>最新采集1</Text>
                            </View>      
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Profile;
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
