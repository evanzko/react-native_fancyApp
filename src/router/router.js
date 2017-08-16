import React from 'react';

import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Landing from '../pages/LandingPage';
import Login from '../pages/FancyLogin';
import Home from '../pages/Home';
import UserList from '../pages/UserList';
import User from '../pages/User';
import Edit from '../pages/Edit';
import Forgot from '../pages/Forgot';
import Fetch from '../pages/Fetch'

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
        navigationOptions: {
            header: null
        }
    }

});

export const UserStack = StackNavigator({
    UserList: {
        screen: UserList,
        navigationOptions: {
            header: null
        }         
    },
    User: {
        screen: User,
        navigationOptions: {
            header: null
        }        
    },
    Edit: {
        screen: Edit,
        navigationOptions: {
            header: null
        }        
    },
});

export const SignedIn = DrawerNavigator({
    Home: {
        screen: Home,
    },
    UserList: {
        screen: UserStack,
    },
    Fetch: {
        screen: Fetch,
    }
});



export const RootNavigator = (signedIn = false) => {
    return StackNavigator(
        {
            SignedIn: {
                screen: SignedIn,
                navigationOptions: {
                    gesturesEnabled: false
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