import React, { Component } from 'react';
import { View, TextInput, KeyboardAvoidingView, ScrollView,StyleSheet,Text,TouchableOpacity, Alert} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


export default class ForgotPass extends Component {
    constructor(props) {
        super(props);
        this.state = {email: ''};
    }

    render() {
        return (
            <ScrollView style={styles.scroll}>
                <View>
                    <View style = {styles.top}>
                        <Icon 
                            name = 'cubes'
                            size = {75}
                            style = {styles.logo}
                        />
                        <Text style = {styles.title}>Forgot Password?</Text>
                    </View>
                    <View style={styles.hr}>
                    </View>
                    <View style= {styles.mid}>
                        <Text style = {styles.text}>Hey, it happens to everyone. Let us know what email you used to login and we'll send you an email with instructions</Text>
                        <View style = {{flexDirection: 'column'}}>
                            <Text>Email Address:</Text>
                            <TextInput
                                returnKeyType="next"
                                keyboardType= "email-address"
                                autoCapitalize="none"
                                autoCorrect = {false}
                                onChange = {(user) => this.setState({user})}
                                style={styles.input}
                            />
                        </View>
                    </View>
                    <TouchableOpacity  
                        onPress={() => Alert.alert('test message', 'you have submitted your email')}
                        style = {styles.sumbit}>
                        <Text style = {styles.text}>Submit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  
                        onPress={() => this.props.navigation.navigate('Login')}
                        style = {styles.cancel}>
                        <Text style = {styles.text}>cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        backgroundColor: 'white',
        marginBottom: 20,
        paddingHorizontal: 10
    },
    top: {
        alignSelf: 'flex-start',
        flexDirection: 'row'
    },
    logo: {
        color: '#7f8c8d',
    },
    title: {
        fontSize: 30,
        color: 'red',
        fontWeight: 'bold'
    },
    hr: {
        borderBottomColor: 'red',
        borderBottomWidth: 10,
        marginVertical: 10, 
    },
    text: {
        alignSelf: 'center',
        padding: 10
    },
    mid: {
        alignSelf: 'flex-start'
    },

});