import { AsyncStorage } from "react-native";

import Store from './store/LoginStore';

// export const onSignIn = (Username) => {
//   AsyncStorage.setItem("username", "true");
// }

export const onSignOut = () => {
  return Store.resetCred();
}

export const isSignedIn = () => {
  var res = new Promise((resolve, reject) => {
    if(Store.token){
      resolve(true);
    }else{
      // Get the Keychain credentials and login again and 
     Store.getCred()
             .then((creds)=>{ 
               // Make an API call to the server and check if user can signin easily.
               Store.loginUser(creds.username,creds.password,false).then((resp)=>{
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