import React from 'react';
import {
    Text,
    View,
    Button,
    ScrollView
} from 'react-native';
import { StackNavigator, DrawerNavigator, DrawerItems, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';

import Landing from '../pages/LandingPage';
import Login from '../pages/FancyLogin';
import Home from '../pages/Home';
import UserList from '../pages/UserList';
import User from '../pages/User';
import Edit from '../pages/Edit';
import Forgot from '../pages/Forgot';
import Fetch from '../pages/Fetch';
import Camera from '../pages/Camera';
import Audio from '../pages/Audio'

//signed out stack
export const SignedOut = StackNavigator({
    Landing: {
        screen: Landing,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    Forgot: {
        screen: Forgot,
        navigationOptions: ({ navigation }) =>  {
            return {
                headerLeft:(
                    <MIcon name="backspace" size={25} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('Login') }/>
                ),
                headerRight: (
                    <FIcon name = 'cubes' size = {25} style = {{paddingRight: 10,color: '#7f8c8d'}} />
                ),
                title: 'Forgot Password?',
                headerMode: 'screen',
                gesturesEnabled: false,
            }
        }     
    }

});

export const globalLogout =  ({navigation}) => {
    // const navigateAction = NavigationActions.navigate({
    //     routeName: 'SignedOut',
    //     params: {},
    //     action: {},
    // })
    // navigation.dispatch(navigateAction);
}

export const UserStack = StackNavigator({
    UserList: {
        screen: UserList,
        navigationOptions: ({ navigation }) =>  {
            return {
                headerLeft:(
                    <MIcon name="backspace" size={30} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('SignedIn') }/>
                ),
                title: 'User List',
                headerMode: 'screen',
                gesturesEnabled: false,
            }
        }         
    },
    User: {
        screen: User,
        navigationOptions: ({ navigation ,goBack }) => {
            return{
                headerLeft:(
                    <MIcon name="backspace" size={30} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('UserList') }/>
                ),
                headerRight: (
                    <MIcon name="edit" size={30} color="#000" backgroundColor="#fff" style = {{paddingRight: 10}} onPress ={ () => navigation.navigate('Edit') }/>
                ),
                title: 'Information of List',
                headerMode: 'screen',
            }
        }        
    },
    Edit: {
        screen: Edit,
        navigationOptions: ({ navigation}) => {
            return{
                headerLeft:(
                    <MIcon name="backspace" size={30} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('User') }/>
                ),
                title: 'Information of List',
                headerMode: 'screen',
            }
        }       
    },
});


export const homeScreen = StackNavigator({
    Home:{
        screen: Home,
        navigationOptions: ({ navigation }) =>  {
            return {
            drawerLabel: 'Home',
            headerLeft:(
                <MIcon name="menu" size={30} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress = {() => navigation.navigate('DrawerOpen')}/>
            ),
            title: 'Home Screen',
            headerMode: 'screen',
            drawerIcon: () => (
                <FIcon
                name= 'home'
                size= {25}
                />
            ),
        }    
    }
    }
});

export const fetchScreen = StackNavigator({
    Fetch:{
        screen: Fetch,
        navigationOptions:  ({ navigation }) =>  {
            return{
                drawerLabel: 'info',
                Header: 'User Info',
                title: 'User Info',
                headerLeft:(
                    <MIcon name="backspace" size={30} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('Home') }/>
                ),
                headerMode: 'screen',
                drawerIcon: () => (
                    <FIcon
                    name= 'info'
                    size= {25}
                    />
                ),
            }
        }
    }
});

export const soundScreen = StackNavigator({
    Fetch:{
        screen: Audio,
        navigationOptions:  ({ navigation }) =>  {
            return{
                headerLeft:(
                    <MIcon name="backspace" size={30} color="#000" backgroundColor="#fff" style = {{paddingLeft: 10}} onPress ={ () => navigation.navigate('Home') }/>
                ),
                headerMode: 'screen',
                drawerLabel: 'Audio',
                title: 'Record your memo',
                drawerIcon: () => (
                    <FIcon
                    name= 'music'
                    size= {25}
                    />
                ),
                gesturesEnabled: false,

            }
        }
    }
});

export const SignedIn = DrawerNavigator({
    Home: {
        screen: homeScreen,
    },
    UserList: {
        screen: UserStack,
        navigationOptions: {
            drawerLabel: 'Users',
            drawerIcon: () => (
                <FIcon
                name= 'users'
                size= {25}
                />
            ),
            gesturesEnabled: false,
        }
    },
    Fetch: {
        screen: fetchScreen,
    },
    Camera: {
        screen: Camera,
        navigationOptions: {
            drawerLabel: 'Camera',
            drawerIcon: () => (
                <FIcon
                name= 'camera'
                size= {25}
                />
            ),
        }
    },
    Audio: {
        screen: soundScreen,
    },
},{
    contentOptions: {
        activeBackgroundColor: '#2c3e50'
    },
    contentComponent: props => {
        return(
            <View style = {{backgroundColor: '#bdc3c7', flex: 1}}>
                <View>
                    <FIcon 
                        name = 'cubes'
                        size = {50}
                        style = {{color: 'white', alignSelf: 'center'}}
                    />
                </View>
                <ScrollView>
                    <DrawerItems {...props} /> 
                </ScrollView>
            </View>
        );

    }
});





export const RootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false,
                    title: 'test',
                }
            },
            SignedOut: {
                screen: SignedOut,
                navigationOptions: {
                    gesturesEnabled: false
                }
            },
        },
        {
            headerMode: 'none',
            mode: 'modal',
            initialRouteName: signedIn ? "SignedIn" : "SignedOut"
        }
    );
};