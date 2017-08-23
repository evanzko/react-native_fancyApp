import { observable} from 'mobx';
import {observer} from 'mobx-react/native'
import { Alert, ListView } from 'react-native';


class UserStore{
    
    @observable userInfo;
    @observable token;
    @observable startingBalence = 0;
    @observable users = [];
    @observable userList;
    @observable currentUser;

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
                    Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                    return error;
                })
        }
    }

    setUserInfo(user){
        console.log('I navigated here');
        this.userInfo = user;
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
                this.users = responseJson.data
                var ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
                this.userList = ds.cloneWithRows(responseJson.data);     
                console.log('userList: ', this.userList)

            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                return error;
            })
    }

    setCurrentUser(index){
        console.log('Setting the current user to user:', index)
        this.currentUser = this.users[index];
        console.log(this.currentUser)
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
                this.currentUser = responseJson
                console.log('post update: ',this.currentUser)  
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                return error;
            })
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
                this.currentUser = responseJson
                console.log('post update: ',this.currentUser.user_status)  
            })
            .catch((error) => {
                console.log(error);
                Alert.alert('Connection error', 'Couldn\'t fetch the data.');
                return error;
            })
    }
}

const UStore = new UserStore()
export default UStore