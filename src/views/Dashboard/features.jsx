import React from 'react';
import Location from '@material-ui/icons/LocationOn';
import Ring from '@material-ui/icons/PhonelinkRing';
import Password from '@material-ui/icons/SettingsRemote';
import Lock from '@material-ui/icons/Lock';
import Format from '@material-ui/icons/DeleteForever';
import Clear from '@material-ui/icons/Clear';
import Theft from '@material-ui/icons/DirectionsRun';
import Contact from '@material-ui/icons/ContactPhone';

const features = [
    {
        name : "Track Your Device",
        description : "Track device location real time",
        detail : "Click on this Button to fetch your Location on the map",
        event : "Show on Map",
        api : "location",
        icon : <Location />
    },
    {
        name : "Ring Your Device",
        description : "Device will ring even if it’s in silent mode",
        detail : "Click this button to ring your device",
        event : "Switch On",
        api : "ring",
        icon : <Ring />
    },
    {
        name : "Lock your device",
        description : "Set the password remotely",
        detail : "noDetail",
        event : "Lock",
        api : "lock",
        icon : <Lock />
    },
    {
        name : "Format your phone",
        description : "All your contents will be removed",
        detail : "Click this button to erase all the data on your Device. Once cleared, you wont be getting the data. Use Carefully!",
        event : "Format",
        api : "format",
        icon : <Format />
    },
    {
        name : "Prevent Power Off",
        description : "Wipe Your Device",
        detail : "Click this button to prevent intruder from switching off your phone",
        event : "Submit",
        api : "prevent",
        icon : <Clear />
    },
    {
        name : "Theft Information",
        description : "Intruder details including multiple photos and video",
        detail : "Click this button to view your theft information",
        event : "Go",
        api : "theft",
        icon : <Theft />
    },
    {
        name : "Contact Back up",
        description : "Back up of your contacts",
        detail : "Click this button to see your contact backup",
        event : "Go",
        api : "contact",
        icon : <Contact />
    }
];

export default features;
