import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    ScrollView,
    Dimensions,
    Image,
} from 'react-native';

import FIcon from 'react-native-vector-icons/FontAwesome';

const{ width, height } = Dimensions.get('window');

var timerId = null;
export default class Home extends Component {
    componentDidMount() { //method for changing the background image of the app
        let scrollValue = 0;
        let counter = 0;
        timerId = setInterval(function(){
            //if the counter equals 2 ( the number of pictures loaded onto the app)
            //set the scrollValue back to the 0 so it can start at the first image again
            if(counter == 2){
                scrollValue = 0;
                counter = 0;
            }else{
                counter += 1; //increment counter
                scrollValue = scrollValue + width;   // width = screen width 
            }
            _scrollView.scrollTo({x: scrollValue})  //scroll to the next image
        }, 10000);
    }
    navigateFunction(){
        clearInterval(timerId); //stop the picture sliding effect. Ran into an error when moving to 
        //another screen if this isn't here
        this.props.navigation.navigate('Login') //navigate to the screen for information
    }
    render(){
        return(
            <View>
                <ScrollView 
                ref={(scrollView) => { _scrollView = scrollView; }}
                horizontal={true} pagingEnabled={true} scrollEnabled={false} 
                //scroll settings, scroll horizontal and move by page
                //made the screen locked so no scrolling by the user
                >
                    <Image source={require('../images/SeattleSkyline.jpg')} style={{height, width}} />
                    <Image source={require('../images/wheel.jpg')} style={{height, width}} />
                    <Image source={require('../images/splash.jpg')} style={{height, width}} /> 
                </ScrollView>
                <View style= {styles.backScreen}>
                    <Text style = {styles.title}>Welcome!</Text>
                    <FIcon 
                        name = 'cubes'
                        size = {100}
                        style = {styles.logo}
                    />
                    <View style = {styles.center}>
                        <TouchableOpacity  
                            onPress={this.navigateFunction.bind(this)}
                            style = {styles.login}>
                            <Text style = {styles.text}>Sign in</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 40,
    },
    logo:{ //style for the logo's in the input field
        color: 'white',
        alignSelf: 'center'
    },
    backScreen: { //style for the backscreen that lays on top of the images
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.6)',
        position: 'absolute',
        height: height,
        width: width,
        paddingBottom: 20,
    },
    login: { //style for the login button
        width: 250,
        height: 30,
        backgroundColor: '#95a5a6',
        alignSelf: 'center',
        borderRadius: 30,
        marginVertical: 10,
        backgroundColor: '#f39c12'
    },
    text: { //style for the text in the button's, such as login and forgot password
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    },
    center: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});