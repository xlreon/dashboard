import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Settings from '@material-ui/icons/Settings';
import Maps from "views/Maps/Maps.jsx";
import MobileTabs from 'components/MobileTabs/MobileTabs';
import DeviceList from 'components/Devices/DeviceList';
import logo from "assets/img/pfa.png";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class DashBoard extends React.Component {
  state = {
    open: true,
    showAll : true,
    settings : null,
    location: [{ lat: 12.9716, lng: 77.5946 }],
    imeiList : ['1111','2222'],
    features :
    [
      {
        name : "Play Sound",
        description : "sncjancojanclancknckan",
        detail : "Detail1",
        event : "Stop Ringing"
      },
      {
        name : "Get Location",
        description : "Show your current location",
        detail : "Click on this Button to fetch your Location on the map",
        event : "Show on Map"
      },
      {
        name : "Secure Device",
        description : "uiebivsvuibiebvscsd",
        detail : "Detail2",
        event : "Secure"
      },
      {
        name : "Erase Device",
        description : "AIUCBIUASCVOICOSDIVVNELKVSN",
        detail : "Detail3",
        event : "Erase"
      }
    ],
    phones: [],
    // phones : [
    //   {
    //     name : "Nexus 5P",
    //     os : "Android",
    //     battery : "55",
    //     wifi : "TP_LINK",
    //     location: { lat: 12.9716, lng: 77.5946 }
    //   },
    //   {
    //     name : "MOTO G5 S+",
    //     os : "Android",
    //     battery : "20",
    //     wifi : "ACT",
    //     location: {lat : 20.4625, lng : 85.8830}
    //   }
    // ]
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  changeLocation= (loc) => {
    console.log(loc);
    this.setState({ location : [loc], showAll: false });
  };

  getLocations = () => {
    var list = []
    {this.state.phones.map((prop, key) => {
      return list.push(prop.location);
    })}
    return list;
  };

  showAllDevices = () => {
    this.setState({ showAll: true });
  };

  settingsClick = event => {
    this.setState({ settings: event.currentTarget });
  };

  settingsClose = () => {
    this.setState({ settings: null });
  };


  componentDidMount() {

    var phoneList = [];

    {this.state.imeiList.map((prop, key) => {
      
      var body = { imei: prop};

      var formBody = [];
      for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      axios.post(`http://localhost:8080/phone/get`, 
      formBody
      )
      .then(res => {
        phoneList.push(res.data.body.content);
        this.setState({phones: phoneList});
      })
      .catch(error => console.log(error))

    })}
    
    this.getLocations();


    // fetch('http://localhost:8080/phone/get', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //   },
    //   body: formBody
    // })
    // .then(res => res.json())
    // .then(res => {
    //     console.log(res);
    //   })
    // .catch(error => console.log("Error",error))
  }

  render() {
    const { classes } = this.props;
    const { open, location, showAll, settings } = this.state;

    const drawer = (
      <Drawer
        anchor="left"
        variant="persistent"
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
      <Grid container spacing={12}>
        <GridItem xs={1} className={classes.imgContainer}>
          <img src={logo} alt="logo" className={classes.img} />
        </GridItem>
        <GridItem xs={9}>
          <Typography variant="headline" color={'primary'} className={classes.drawerLogo}>Find My Device</Typography>
        </GridItem>
        <GridItem xs={2} >
          <div className={classes.drawerHeader}>
            <IconButton
              aria-owns={settings ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.settingsClick}
            >
              <Settings />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={settings}
              open={Boolean(settings)}
              onClose={this.settingsClose}
            >
              <MenuItem onClick={this.settingsClose}>Profile</MenuItem>
              <MenuItem onClick={this.settingsClose}>My account</MenuItem>
              <MenuItem onClick={this.settingsClose}>Logout</MenuItem>
            </Menu>
            <IconButton onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </div>
        </GridItem>
      </Grid>
        {/* <MobileTabs/> */}
        <DeviceList 
          changeLocation={this.changeLocation} 
          phones={this.state.phones} 
          className={classes.DeviceList}
          features={this.state.features}
        />
        <Button color="primary" className={classes.button} onClick={this.showAllDevices}>
          Show all Devices
        </Button>
      </Drawer>
    );

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          {drawer}
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <div className={classes.mainPanel} ref="mainPanel">
                <Maps 
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.open}
                    locations={showAll ? this.getLocations() : location}
                />
                </div>
          </main>
        </div>
      </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle, { withTheme: true })(DashBoard);