import React, {Component} from 'react';
import {TextInput, View, Keyboard} from 'react-native';
import {Notifications} from 'expo';
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'
import { FontAwesome } from '@expo/vector-icons'; 

export default class Timer extends Component {
    onSubmit(e) {
        Keyboard.dismiss();

        const localNotification = {
            title: 'GuipperApp',
            body: "A vibration was detected, don't forget to save your your master piece"
        };

        /*const schedulingOptions = {
            time: (new Date()).getTime() + Number(e.nativeEvent.text)
        }*/

        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleLocalNotificationAsync(localNotification);
        //Notifications.addNotificationResponseReceivedListener
    }

    handleNotification() {
        console.warn('ok! got your notif');
    }

    async componentDidMount() {
        // We need to ask for Notification permissions for ios devices
        let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);

        if (Constants.isDevice && result.status === 'granted') {
            console.log('Notification permissions granted.')
        }

        // If we want to do something with the notification when the app
        // is active, we need to listen to notification events and 
        // handle them in a callback
        //Notifications.addListener(this.handleNotification);
    }

    render() {
        return (
            <View style={{flex: 1,justifyContent: 'center'}}>
               <FontAwesome.Button name="bluetooth-b" size={50} color="black" backgroundColor="white" onPress={this.onSubmit}>Connect to the Guip</FontAwesome.Button>
            </View>
        );
    }
};