import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Maps from "views/Maps/Maps.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Grid from "@material-ui/core/Grid";
import AppBar from '@material-ui/core/AppBar';
import IconButton from "@material-ui/core/IconButton";
// import BackIcon from "@material-ui/icons/ArrowBack";
// import GridItem from "components/Grid/GridItem.jsx";
// import Paper from 'components/Papexr/Paper.jsx';
// import CustomCard from 'components/Card/Card.jsx';
import CustomDrawer from "components/CustomDrawer/CustomDrawer.jsx";
// import Button from '@material-ui/core/Button';
import axios from 'axios';
import features from './features.jsx';
// import android from "assets/img/android.png";
// import AddIcon from '@material-ui/icons/Add';
// import AppBar from 'components/AppBar/AppBar';
import Settings from 'components/Settings/Settings.jsx';
import SimpleSelect from "components/SimpleSelect/SimpleSelect.jsx";

// const styles = {
//   appRoot: {
//     flexGrow: 1,
//   },
//   appFlex: {
//     flexGrow: 1,
//   },
//   appMenuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// };

class DashBoard extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      showAll : true,
      settings : null,
      location: [{ lat: 12.9716, lng: 77.5946 }],
      phones: [],
      currentPhone: 0
    };
  }


  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  showDrawer = () => {
    this.setState({ open : !this.state.open})
  }

  changeLocation= (loc) => {
    console.log(loc);
    this.setState({ location : [loc], showAll: false });
  };

  getLocations = () => {
    var list = []
    if (this.state.phones.length)
    {
      {this.state.phones.map((prop, key) => {
        return list.push(prop.location);
      })}
    }
    return list;
  };

  showAllDevices = () => {
    this.setState({ showAll: true });
  };

  componentDidMount() {

    
    var body = { email : 'uniqtest123@gmail.com'};
    
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/imei/get`, 
      formBody
    )
  .then(res => {
    var imeiList = res.data.body.content;

    var phoneList = [];
  
    // console.log(imeiList)
    {imeiList.map((prop, key) => {
    
    var body = { imei: prop};
    
    var formBody = [];
      for (var property in body) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(body[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      
      axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/phone/get`, 
        formBody
      )
      .then(res => {
        if (res.data.body.content !== null) {
        phoneList.push(res.data.body.content);
        this.setState({phones: phoneList});
        }
        
      })
      .catch(error => console.log(error))

    })}
    
  })
  .catch(error => console.log(error))
  
  this.getLocations();

  }

  handleChange = event => {
    console.log("in")
    console.log(event.target.value);
    this.setState({currentPhone: event.target.value !== undefined ? event.target.value : 0})
    console.log(this.state.currentPhone)
  }
  
  render() {
    const { classes } = this.props;
    const { open, location, showAll, phones, currentPhone } = this.state;
    
    // console.log(phones);
    return (
      <div>
      <div className={classes.appRoot}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.appMenuButton} color="inherit" aria-label="Menu">
              <MenuIcon onClick={this.showDrawer}/>
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.appFlex}>
              UniQ Mobile Finder
            </Typography>
              <SimpleSelect
                className={classes.appSelectPhone}
                phones={phones} 
                device={currentPhone}
                handleChange={this.handleChange}
                />
              <Settings />
          </Toolbar>
        </AppBar>
        </div>
        {/* {console.log("current phone -> ",currentPhone !== undefined ? currentPhone : 0)} */}
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomDrawer 
            open={open}
            handleDrawerToggle = {this.handleDrawerToggle}
            phones={phones}
            currentPhone={this.state.currentPhone}
            features={features}
            changeLocation={this.changeLocation} 
            showAllDevices={this.showAllDevices}
          />
          <main
            className={classNames(classes.content, classes[`content-left`], {
              [classes.contentShift]: open,
              [classes[`contentShift-left`]]: open,
            })}
          >
            <div className={classes.mainPanel} ref="mainPanel">
                <Maps 
                    locations={showAll ? this.getLocations() : location}
                />
                </div>
          </main>
        </div>
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