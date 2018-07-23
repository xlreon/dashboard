import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Maps from "views/Maps/Maps.jsx";
import MobileTabs from 'components/MobileTabs/MobileTabs';
import DeviceList from 'components/Devices/DeviceList';
import logo from "assets/img/pfa.png";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";

class DashBoard extends React.Component {
  state = {
    open: true,
    location:{ lat: 12.9716, lng: 77.5946 }
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  changeLocation= (loc) => {
    console.log(loc);
    this.setState({ location : loc });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

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
        <GridItem xs={1}>
          <img src={logo} alt="logo" className={classes.img} />
        </GridItem>
        <GridItem xs={9}>
          <Typography variant="display1" color={'primary'} className={classes.drawerLogo}>Find My Device</Typography>
        </GridItem>
        <GridItem xs={2} >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </div>
        </GridItem>
      </Grid>
        {/* <MobileTabs/> */}
        <DeviceList changeLocation={this.changeLocation}/>
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
                    location={this.state.location}
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