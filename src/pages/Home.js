import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { onSignOut } from '../auth';
import Store from '../store/LoginStore';




export default class Home extends Component {

    
    render(){
        
        return(
            <View>
                <TouchableOpacity  
                    onPress={() => this.props.navigation.navigate('Fetch')}
                    style = {styles.login}>
                    <Text style = {styles.text}>Display starting balence</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => {Store.getUsers().then(() => this.props.navigation.navigate('UserList'))}}
                    style = {styles.login}>
                    <Text style = {styles.text}>Get a list of Users</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => {onSignOut().then(() => this.props.navigation.navigate('SignedOut'))}}
                    style = {styles.login}>
                    <Text style = {styles.text}>Sign Out</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    login: { //style for the login button
        width: 250,
        height: 30,
        backgroundColor: '#95a5a6',
        alignSelf: 'center',
        borderRadius: 30,
        marginVertical: 10
    },
    text: { //style for the text in the button's, such as login and forgot password
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
});
