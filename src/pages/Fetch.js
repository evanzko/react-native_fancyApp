import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Button, Alert, TouchableHighlight } from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Store from '../store/LoginStore';


@observer
export default class Fetch extends Component {
  componentWillMount(){
    Store.getBalence();
  }


  render() {
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
        <Text>This is a page displaying user infomation</Text>
        <Text>User infomation</Text>
        <Text>Token: {Store.token}</Text>
        <Text>User: {Store.creds.username}</Text>
        <Text>Pass: {Store.creds.password}</Text>
        <Text>Starting Balence: {Store.startingBalence}</Text>
      </View>
    );
  }
}