
import { observable} from 'mobx';
import { Alert, ListView } from 'react-native';
import * as Keychain from 'react-native-keychain';

import UStore from './UserStore';

class LoginStore {

    @observable creds = { username: "", password: "" };
    
    @observable loading = true;


    loginUser(username,password,save=false){
        //hi@cashvue.com tech2day
        console.log('logging in '+ username)
        return fetch('https://demo.cashvue.com/api/v1.0/login', {
            method: 'POST',
            body: JSON.stringify(
                { email: username, password: password }
            )
        })
            .then((response) => {
                if(!response.ok){
                    throw Error("Server Error. Something Went Wrong.");
                }
                return response.json();
            })
            .then((responseJson) => {
                UStore.token = responseJson.token;
                this.loading = false;
                console.log(UStore.hello);
                UStore.setUserInfo(responseJson.user);
                if(save){
                    this.saveCred(username,password);
                }
                return responseJson;
            })
            .catch((error) => {
                console.log(error);
                this.loading = false;
                Alert.alert('Wrong credentials?', 'Oops something went wrong, try again!');
                return error;
            })
    }

    saveCred(username, password){
        this.creds.username = username;
        this.creds.password = password;
        console.log("user: ", this.creds.username, "pass: ", this.creds.password);
        Keychain
            .setGenericPassword(username, password)
            .then(function() {
            console.log('Credentials saved successfully!');
        });
    }

    getCred(){
        return Keychain
            .getGenericPassword()
            .then((credentials) => {
                console.log('Credentials successfully loaded for user ' + credentials.username);
                var creds = {user:credentials.username, pass: credentials.password}
                console.log(creds)
                this.creds = credentials;
                return(credentials);
            }).catch((error) =>{
                console.log('Keychain couldn\'t be accessed! Maybe no value set?', error);
                return error;
        });
    }

    resetCred(){
        return Keychain
            .resetGenericPassword()
            .then(function() {
            console.log('Credentials successfully deleted');
         });
    }


}

const loginStore = new LoginStore()
export default loginStore