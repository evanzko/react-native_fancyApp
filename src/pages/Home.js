import React, { Component } from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { onSignOut } from '../auth';
import UStore from '../store/UserStore';




export default class Home extends Component {

    render(){
        
        return(
            <View>
                <TouchableOpacity  
                    onPress={() => this.props.navigation.navigate('Fetch')}
                    style = {styles.buttonEven}>
                    <Text style = {styles.text}>Display starting balance</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                    onPress={() => this.props.navigation.navigate('UserList')}
                    style = {styles.buttonOdd}>
                    <Text style = {styles.text}>Get a list of Users</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                onPress={() => this.props.navigation.navigate('Audio')}
                style = {styles.buttonEven}>
                <Text style = {styles.text}>Record a memo</Text>
                </TouchableOpacity>

                <TouchableOpacity  
                    onPress={() => this.props.navigation.navigate('Camera')}
                    style = {styles.buttonOdd}>
                    <Text style = {styles.text}>Take a picture</Text>
                </TouchableOpacity>
                <TouchableOpacity  
                onPress={() => {onSignOut().then(() => this.props.navigation.navigate('SignedOut'))}}
                style = {styles.buttonEven}>
                <Text style = {styles.text}>Sign Out</Text>
                </TouchableOpacity>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    buttonEven: { //style for the button
        width: 250,
        height: 30,
        backgroundColor: '#95a5a6',
        alignSelf: 'center',
        borderRadius: 30,
        marginVertical: 10
    },
    buttonOdd: { //style for the button
        width: 250,
        height: 30,
        backgroundColor: '#f39c12',
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
