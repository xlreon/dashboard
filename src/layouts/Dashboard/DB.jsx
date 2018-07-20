import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Maps from "views/Maps/Maps.jsx";
import MobileTabs from 'components/MobileTabs/MobileTabs';
import {transition} from "assets/jss/material-dashboard-react.jsx";
import logo from "assets/img/pfa.png";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";

class PersistentDrawer extends React.Component {
  state = {
    open: true,
  };

  handleDrawerToggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchor, open } = this.state;

    const drawer = (
        <Drawer
          anchor="left"
          variant="persistent"
          open={open}
        //   onClose={props.handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper
          }}
        >
        
        {/* <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </div> */}
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
          {/* {brand} */}
          <MobileTabs/>
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
                />
                </div>
          </main>
        </div>
      </div>
    );
  }
}

PersistentDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(dashboardStyle, { withTheme: true })(PersistentDrawer);