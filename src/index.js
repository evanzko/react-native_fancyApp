import React, {Component} from "react";
import { RootNavigator } from "./router/router";
import { onSignOut ,isSignedIn } from './auth';
import { AppState } from "react-native";
import {NavigationActions } from 'react-navigation';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
      console.log('the app state changed to: '+ nextAppState);
      if(nextAppState.match(/inactive|background/)){
        setTimeout(()=>{
          //LStore.resetCred();   //reset keychaiTokenn credentials
          //userStore.token = ''; //reset 
          console.log('the app will logout now');
          this.glogout();

        },3000);
      }
    }
  
  glogout =()=>{
    this.setState({
      signedIn: false
    });
    onSignOut; //signs out the user
    const navigateAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Landing'})
      ]
    })
    this.navigator && this.navigator.dispatch(navigateAction);
  }

  componentWillMount() {
    isSignedIn()
      .then(res => this.setState({signedIn: res, checkedSignIn: true}))
      .catch(err => alert(err));
  }
    
  render() {
    const {checkedSignIn, signedIn} = this.state;

    //Don't load if we haven't checked if we're signed in yet
    if(!checkedSignIn) {
      return null;
    }

    //createRootNavigator will return a navigator dependent if the user is logged in or not
    const Layout = RootNavigator(signedIn);
    return <Layout ref={nav => { this.navigator = nav; }}/>;

  }
}