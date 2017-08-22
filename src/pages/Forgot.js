import React, { Component } from 'react';
import { ScrollView,StyleSheet,Text, WebView } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


export default class ForgotPass extends Component {
    render() {
        return (
                <WebView
                    source = {{uri: 'https://cashvue.com/login/#/forgot'}}
                    style= {{marginTop: 20}}
                />
        );
    }
}
