import React, { Component } from 'react';
import { ActivityIndicator, ListView, Text, View, Button, Alert, TouchableHighlight, StyleSheet } from 'react-native';
import { observer } from 'mobx-react/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UStore from '../store/UserStore';


@observer
export default class Fetch extends Component {
  //gets the balance of the 
  componentWillMount(){
    UStore.getBalence();
  }


  render() {
    if(UStore.loading) {
      return(
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return(
      <View style = {styles.screen}>
        <Text style = {styles.bodyText}>User infomation</Text>
        <Text style = {styles.bodyText}>Starting Balance: <Text style={{color:'red'}}>{UStore.startingBalence}</Text></Text>
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
  screen: {
    backgroundColor: '#bdc3c7',
    flex: 1,
  },

})