import React, {Component} from "react";
import { RootNavigator } from "./router/router";
import { isSignedIn } from './auth';


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signedIn: false,
      checkedSignIn: false,
    };
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
    return <Layout />;

  }
}