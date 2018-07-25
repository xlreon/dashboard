const features = [
    {
        name : "Get Location",
        description : "Show your current location",
        detail : "Click on this Button to fetch your Location on the map",
        event : "Show on Map",
        api : "location"
    },
    {
        name : "Alarm On",
        description : "Switch on your alarm",
        detail : "Click this button to switch your alarm on",
        event : "Switch On",
        api : "alarm"
    },
    {
        name : "Alarm Off",
        description : "Switch off your alarm",
        detail : "Click this button to switch your alarm off",
        event : "alarm",
        api : "alarm"
    },
    {
        name : "Set Remote Password",
        description : "Switch off your alarm",
        detail : "Click this button to switch your alarm off",
        event : "Submit",
        api : "password"
    },
    {
        name : "Lock Device",
        description : "Lock Your Device",
        detail : "Click this button to lock your Device",
        event : "Lock",
        api : "lock"
    },
    {
        name : "Wipe Device",
        description : "Wipe Your Device",
        detail : "Click this button to erase all the data on your Device. Once cleared, you wont be getting the data. Use Carefully!",
        event : "Wipe",
        api : "wipe"
    }
];

export default features;
