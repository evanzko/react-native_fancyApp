
import { observable, action } from 'mobx';
import { Alert, ListView } from 'react-native';
import * as Keychain from 'react-native-keychain';

class LoginStore {

    @observable creds = { username: "", password: "" };
    @observable token;
    @observable loading = true;
    @observable userInfo;
    @observable startingBalence = 0;
    @observable users = [];
    @observable userList;
    @observable currentUser;

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
                this.token = responseJson.token;
                this.userInfo = responseJson.user;
                this.loading = false;
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

    getBalence(){
        if(this.token == null){
            Alert.alert('Error Session expired', 'You\'re not logged in make sure you\'re loggin in');
        }else{
            return fetch('https://demo.cashvue.com/api/v1.0/beginningbalance', {
                method: 'GET',
                headers: {
                    'Authorization': this.token
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson)
                    this.startingBalence = responseJson.amount;
                })
                .catch((error) => {
                    console.log(error);
                    this.loading = false;
                    Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                    return error;
                })
        }
    }

    getUsers(){
        return fetch('https://demo.cashvue.com/api/v1.0/user?limit=150',{
            method: 'GET',
            headers: {
                'Authorization': this.token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                this.loading = false;
                this.users = responseJson.data
                var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
                this.userList = ds.cloneWithRows(responseJson.data);     
                console.log('userList: ', this.userList)

            })
            .catch((error) => {
                console.log(error);
                this.loading = false;
                Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                return error;
            })
    }

    setCurrentUser(index){
        console.log('Setting the current user to user:', index)
        this.currentUser = this.users[index];
        console.log(this.currentUser)
    }


    updateInfo(newRole, newStatus){
        //if the newRole is different then the current role then update it
        if(newRole !== this.currentUser.roles[0].name){
            this.setUserRole(newRole);
        }
        //if the newStatus is different then the current role then update it
        if(newStatus !== this.currentUser.user_status){
            this.setUserStatus(newStatus);
        }
    }

    setUserRole(newRole){       
        return fetch('https://demo.cashvue.com/api/v1.0/user/'+this.currentUser.id,{
            method: 'PUT',
            headers: {
                'Authorization': this.token
            },
            body: JSON.stringify(
                { role_id: newRole}
            ),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('pre update: ',this.currentUser);
                this.loading = false;
                this.currentUser = responseJson
                console.log('post update: ',this.currentUser)  
            })
            .catch((error) => {
                console.log(error);
                this.loading = false;
                Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                return error;
            })
    }

    setUserStatus(newStatus){       
        return fetch('https://demo.cashvue.com/api/v1.0/user/'+this.currentUser.id,{
            method: 'PUT',
            headers: {
                'Authorization': this.token
            },
            body: JSON.stringify(
                { account_user_status_id: newStatus}
            ),
        })
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('pre update: ',this.currentUser.user_status);
                this.loading = false;
                this.currentUser = responseJson
                console.log('post update: ',this.currentUser.user_status)  
            })
            .catch((error) => {
                console.log(error);
                this.loading = false;
                Alert.alert('Connection error', 'Couldn\'t fetch the data.');
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