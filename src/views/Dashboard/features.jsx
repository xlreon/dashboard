import React from 'react';
import Location from '@material-ui/icons/LocationOn';
import AlarmOn from '@material-ui/icons/AlarmOn';
import AlarmOff from '@material-ui/icons/AlarmOff';
import Password from '@material-ui/icons/SettingsRemote';
import Lock from '@material-ui/icons/Lock';
import Wipe from '@material-ui/icons/Clear';

const features = [
    {
        name : "Get Location",
        description : "Show your current location",
        detail : "Click on this Button to fetch your Location on the map",
        event : "Show on Map",
        api : "location",
        icon : <Location />
    },
    {
        name : "Alarm On",
        description : "Switch on your alarm",
        detail : "Click this button to switch your alarm on",
        event : "Switch On",
        api : "alarm",
        icon : <AlarmOn />
    },
    {
        name : "Alarm Off",
        description : "Switch off your alarm",
        detail : "Click this button to switch your alarm off",
        event : "alarm",
        api : "alarm",
        icon : <AlarmOff />
    },
    {
        name : "Set Remote Password",
        description : "Switch off your alarm",
        detail : "Click this button to switch your alarm off",
        event : "Submit",
        api : "password",
        icon : <Password />
    },
    {
        name : "Lock Device",
        description : "Lock Your Device",
        detail : "Click this button to lock your Device",
        event : "Lock",
        api : "lock",
        icon : <Lock />
    },
    {
        name : "Wipe Device",
        description : "Wipe Your Device",
        detail : "Click this button to erase all the data on your Device. Once cleared, you wont be getting the data. Use Carefully!",
        event : "Wipe",
        api : "wipe",
        icon : <Wipe />
    }
];

export default features;
