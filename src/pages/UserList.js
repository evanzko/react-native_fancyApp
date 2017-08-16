import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Store from '../store/LoginStore';


export default class Users extends Component {
    handleClick(id){
        console.log(Store.users[id]);
        Store.setCurrentUser(id);
        this.props.navigation.navigate('User')
    }
    


    render(){
        if(Store.loading) {
            return(
                <View>
                    <ActivityIndicator />
                </View>
            );
        } 
        return(
            <View>
                <Icon
                    name= 'menu'
                    size= {50}
                    style = {{alignSelf: 'flex-start'}}
                    onPress = {() => this.props.navigation.navigate('DrawerOpen')}
                />
                <View style = {styles.line} />
                <ListView
                    style = {styles.lView}
                    dataSource = {Store.userList}
                    renderRow = {
                        (rowData,sectionId,rowId) => <TouchableHighlight style={styles.container} onPress = {this.handleClick.bind(this,rowId)}>
                                        <Text style={styles.text}>
                                        id: {rowId}, email: {rowData.email}
                                        </Text>
                                    </TouchableHighlight>
                    }
                    renderSeparator = {(sectionId, rowId) => <View key = {rowId} style = {styles.seperator} />}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    lView: {
        // flex: 1,
        marginTop: 20,
    },
    container: {
        padding: 12,
        alignItems: 'center',
        height: 60
    },
    text: {
        fontSize: 16,
        padding: 10,
    },
    seperator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: 'black',
    },
    line: {
        backgroundColor: 'black',
        height: StyleSheet.hairlineWidth,
        paddingBottom: 0
    },
});
