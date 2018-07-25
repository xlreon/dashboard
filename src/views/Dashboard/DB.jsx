import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Maps from "views/Maps/Maps.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import CustomDrawer from "components/CustomDrawer/CustomDrawer.jsx";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import features from './features.jsx';

class DashBoard extends React.Component {
  state = {
    open: true,
    showAll : true,
    settings : null,
    location: [{ lat: 12.9716, lng: 77.5946 }],
    phones: [],
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

  componentDidMount() {

    
    var body = { email : 'rohan@gmail.com'};
    
    var formBody = [];
    for (var property in body) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(body[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    axios.post(`http://localhost:8080/imei/get`, 
      formBody
    )
  .then(res => {
    var imeiList = res.data.body.content;

    var phoneList = [];
  
    {imeiList.map((prop, key) => {
    
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
    
  })
  .catch(error => console.log(error))

  console.log(this.state.imeiList)

  
    
    this.getLocations();

  }

  render() {
    const { classes } = this.props;
    const { open, location, showAll } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomDrawer 
            open={open}
            handleDrawerToggle = {this.handleDrawerToggle}
            phones={this.state.phones}
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
                <Grid container spacing={12} className={classes.floatingButton}>
                  <GridItem xs={2}>
                    <Button variant="fab" color="secondary" aria-label="Add" onClick={this.handleDrawerToggle}
                      className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                      <MenuIcon />
                    </Button>
                  </GridItem>
                  <GridItem xs={10}>
                  </GridItem>
                  {/* <GridItem xs={1}>
                      <MenuButton />
                  </GridItem> */}
                </Grid>
                <Maps 
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