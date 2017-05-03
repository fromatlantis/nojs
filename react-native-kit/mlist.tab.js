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

export default class MList extends React.Component {
    static navigationOptions = {
        title: '采集位置',
    }
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 1
        };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面:FirstPageComponent了
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="rgba(0,0,255,.1)"
                    barStyle="default"
                    animated={true}
                />
                <View style={styles.content}>
                    <View style={styles.listContainer}>
                        <View style={styles.listItem}>
                            <View style={styles.listIcon}>
                                <Image source={require('./img/icon.png')}
                                style={styles.image} resizeMode='contain'/>
                            </View>
                            <View style={styles.listDes}>
                                <Text style={styles.des}>众鑫大厦</Text>
                                <Text style={styles.des}>采集时间：2017-03-21 17:15</Text>
                            </View>      
                        </View>
                        <View style={styles.listItem}>
                            <View style={styles.listIcon}>
                                <Image source={require('./img/icon.png')}
                                style={styles.image}/>
                            </View>
                            <View style={styles.listDes}>
                                <Text style={styles.des}>万达广场</Text>
                                <Text style={styles.des}>采集时间：2017-03-21 17:15</Text>
                            </View>      
                        </View>
                    </View>
                </View>
                <View style={styles.tabBar}>
                    <View style={styles.tabBarItem}>
                        <Text style={this.state.currentTab == 0 ? styles.tabBarTextCurrent : styles.tabBarText}>首页</Text>
                    </View>
                    <View style={styles.tabBarItem}>
                        <Text style={this.state.currentTab == 1 ? styles.tabBarTextCurrent : styles.tabBarText}>采集</Text>
                    </View>
                    <View style={styles.tabBarItemPlus}>
                        <Text style={[styles.tabBarText,styles.tabBarItemPlusText]}>+</Text>
                    </View>
                    <View style={styles.tabBarItem}>
                        <Text style={styles.tabBarText}>导航</Text>
                    </View>
                     <View style={styles.tabBarItem}>
                        <Text style={styles.tabBarText}>我的</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    content: {
        flex: 1
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
        height: 30,
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
        height: 30,
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
        height: 40,
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
        color:'#555'
    },
    tabBarTextCurrent: {
        color:'red'
    }
});
