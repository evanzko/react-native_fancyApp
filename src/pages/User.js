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
import UStore from '../store/UserStore';
import { observer } from 'mobx-react/native';

@observer
export default class User extends Component{
    render(){
        const currUser = UStore.currentUser;
        return(
        <View style = {styles.screen}>
            <View style = {styles.body}>
                <Text style = {styles.headerText}>Information about the User</Text>
                <Text style = {styles.text}>User id: {currUser.id}</Text>
                <Text style = {styles.text}>User email: {currUser.email}</Text>
                <Text style = {styles.text}>Account created: {currUser.created_at}</Text>
                <Text style = {styles.text}>User status: {currUser.user_status}</Text>
                <Text style = {styles.text}>User role: {currUser.roles[0].name}</Text>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between' 
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 15,

    },
    editButton: {
        justifyContent: 'flex-end',
        borderColor: 'black',
        borderRadius: 100,
        padding: 15,
        borderWidth: 2,
        marginRight: 10
    },
    editText: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    body: {

    }
});