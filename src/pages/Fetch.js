import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Button, Alert, TouchableHighlight, StyleSheet } from 'react-native';
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
        <Text style = {styles.headerText}>This is a page displaying user info</Text>
        <Text style = {styles.bodyText}>User infomation</Text>
        <Text style = {styles.bodyText}>Starting Balence: <Text style={{color:'red'}}>{Store.startingBalence}</Text></Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 14,
  },

})