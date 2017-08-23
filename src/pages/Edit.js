import React, { Component } from 'react';
import {
    Text,
    View,
    ListView,
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableHighlight,
    Picker
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import UStore from '../store/UserStore';

export default class User extends Component{
    constructor(props){
        super(props);
        this.state = {
            role: UStore.currentUser.roles[0].name,
            user_status: UStore.currentUser.user_status,
        }
    }

    updateRole(newRole){
        console.log("Setting the new role to",newRole)
        this.setState({ role: newRole })
    }

    updateStatus(newStatus){
        console.log("Setting the new status to",newStatus)
        this.setState({ user_status: newStatus})
    }

    handleSubmit(){
        console.log('the information has been submitted now communicating with the server')
        UStore.updateInfo(this.state.role,this.state.user_status)
        this.props.navigation.navigate('User')
    }

    render(){
        return(
        <View>
            <Text style = {styles.Title}>Edit the info about {UStore.currentUser.email}</Text>
            <View>
                <Text style = {styles.Text}>Role: </Text>
                <Picker selectedValue = {this.state.role} mode = 'dropdown' onValueChange = {this.updateRole.bind(this)}>
                    <Picker.Item label = "Administrator" value = "2" />
                    <Picker.Item label = "Accountant" value = "3" />
                    <Picker.Item label = "Basic" value = "4" />
                    <Picker.Item label = "View Only" value = "5" />
                </Picker>
            </View>
            <View>
                <Text style = {styles.Text}>Status: </Text>
                <Picker selectedValue = {this.state.user_status} mode = 'dropdown' onValueChange = {this.updateStatus.bind(this)}>
                    <Picker.Item label = "Active" value = "1" />
                    <Picker.Item label = "Inactive" value = "2" />
                </Picker>
            </View>
            <TouchableHighlight style = {styles.submit} onPress = {this.handleSubmit.bind(this)}>
                <Text style = {styles.submitText}>Submit changes</Text>
            </TouchableHighlight>
            

        </View>
        );
    }
}

const styles = StyleSheet.create({
    Title: {
        fontSize: 30,
        fontWeight:'bold',
        alignSelf: 'center'
    },
    Text: {
        fontSize: 14,

    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between' 
    },
    submit: {
        width: 250,
        height: 30,
        backgroundColor: '#95a5a6',
        alignSelf: 'center',
        borderRadius: 30,
        marginVertical: 10
    },
    submitText: {
        fontSize: 14,
        alignSelf: 'center'
    }
})