import { AsyncStorage, AppState } from "react-native";

import LStore from './store/LoginStore';
import userStore from './store/UserStore';

import {globalLogout} from './router/router';

// export const onSignIn = (Username) => {
//   AsyncStorage.setItem("username", "true");
// }

const appState = AppState.currentState;

export const onSignOut = () => {
  userStore.token = '';
  return LStore.resetCred();
}

export const isSignedIn = () => {
  var res = new Promise((resolve, reject) => {
    if(userStore.token){
      resolve(true);
    }else{
      // Get the Keychain credentials and login againS
     LStore.getCred()
      .then((creds)=>{ 
          // Make an API call to the server and check if user can signin easily.
        LStore.loginUser(creds.username,creds.password,false)
          .then((resp)=>{
            if(resp.token){
              resolve(true);
            }else{
              resolve(false);
            }
          });
      })
      .catch((err)=>{
        resolve(false);
      });
    }

  });
  return res;
};