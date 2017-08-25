import React, { Component } from 'react';
import {
    Text,
    ScrollView,
    View,
    ListView,
    ActivityIndicator,
    Alert,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import { observer } from 'mobx-react/native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import UStore from '../store/UserStore';

@observer
export default class Users extends Component {
    handleClick(id){
        console.log(UStore.users[id]);
        UStore.setCurrentUser(id);
        this.props.navigation.navigate('User')
    }

    componentWillMount(){
        UStore.getUsers();
    }
    


    render(){
        if(UStore.loading) {
            return(
                <View>
                    <ActivityIndicator />
                </View>
            );
        } 
        return(
            <ScrollView>
                <ListView
                    style = {styles.lView}
                    dataSource = {UStore.userList}
                    renderRow = {
                        (rowData,sectionId,rowId) => <TouchableHighlight style={styles.container} onPress = {this.handleClick.bind(this,rowId)}>
                                        <Text style={styles.text}>
                                        id: {rowId}, email: {rowData.email}
                                        </Text>
                                    </TouchableHighlight>
                    }
                    renderSeparator = {(sectionId, rowId) => <View key = {rowId} style = {styles.seperator} />}
                />
            </ScrollView>

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
