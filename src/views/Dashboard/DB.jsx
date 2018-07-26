import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Maps from "views/Maps/Maps.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import GridItem from "components/Grid/GridItem.jsx";
import Paper from 'components/Paper/Paper.jsx';
import CustomCard from 'components/Card/Card.jsx';
import CustomDrawer from "components/CustomDrawer/CustomDrawer.jsx";
import Button from '@material-ui/core/Button';
import axios from 'axios';
import features from './features.jsx';
import android from "assets/img/android.png";
import AddIcon from '@material-ui/icons/Add';

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

  showDrawer = () => {
    this.setState({ open : true})
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
        phoneList.push(res.data.body.content);
        this.setState({phones: phoneList});
      })
      .catch(error => console.log(error))

    })}
    
  })
  .catch(error => console.log(error))
  
  this.getLocations();

  }

  render() {
    const { classes } = this.props;
    const { open, location, showAll, phones } = this.state;
    
    return (
      // open ?
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <CustomDrawer 
            open={open}
            handleDrawerToggle = {this.handleDrawerToggle}
            phones={phones}
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
                  <GridItem xs={4}>
                    <Button variant="fab" color="secondary" aria-label="Add" onClick={() => this.state.open ? this.handleDrawerToggle() : ()=>{}}
                      className={classNames(classes.menuButton, this.state.open && classes.hide)}>
                      {/* <MenuIcon /> */}
                      {/* <Paper widht="100px"
                            height="100px"
                          /> */}
                    <IconButton color="primary" aria-label="Back" className={classes.button} style={{zIndex: "2",position: "absolute",bottom: "0",top: "1vh",right: "2vh"}} onClick={this.showDrawer}>
                      <BackIcon />
                    </IconButton>
                    <Paper 
                      style={{position: "relative"}}
                      width="250%"
                      height="60vh"
                      phoneImg={android}
                      phoneName="One Plus 6"
                      features={features}
                      phones={phones}
                    />
                    </Button>
                    
                  </GridItem>
                  <GridItem xs={8}>
                  </GridItem>
                </Grid>
                <Maps 
                    locations={showAll ? this.getLocations() : location}
                />
                </div>
          </main>
        </div>
      </div>
        // : 
        // <div className={classes.root}>
        //   <div className={classes.appFrame}>
        //     <Paper />
        //   </div>
        // </div>
    );
  }
}

DashBoard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle, { withTheme: true })(DashBoard);