import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import MobileTabs from 'components/MobileTabs/MobileTabs';
import DeviceList from 'components/Devices/DeviceList';
import logo from "assets/img/pfa.png";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Settings from 'components/Settings/Settings.jsx';
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import {
    drawerWidth,
    transition,
    container
  } from "assets/jss/material-dashboard-react.jsx";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
      },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerLogo: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft : 10,
        // justifyContent: 'center',
        // padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    img: {
        width: "30px",
        top: "17px",
        position: "absolute",
        verticalAlign: "middle",
        border: "0"
    },
  });

class CustomDrawer extends React.Component {
  

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Drawer
            anchor="left"
            variant="persistent"
            open={this.props.open}
            classes={{
                paper: classes.drawerPaper
            }}
        >
        <Grid container spacing={12}>
            <GridItem xs={1}>
                <img src={logo} alt="logo" className={classes.img} />
            </GridItem>
            <GridItem xs={9}>
                <Typography variant="headline" color={'primary'} className={classes.drawerLogo}>Find My Device</Typography>
            </GridItem>
            <GridItem xs={2} >
                <div className={classes.drawerHeader}>
                    <Settings />
                    <IconButton onClick={this.props.handleDrawerToggle}>
                        <MenuIcon />
                    </IconButton>
                </div>
            </GridItem>
        </Grid>
            {/* <MobileTabs/> */}
            <DeviceList 
                changeLocation={this.props.changeLocation} 
                phones={this.props.phones} 
                className={classes.DeviceList}
                features={this.props.features}
            />
            <Button color="primary" className={classes.button} onClick={this.showAllDevices}>
                Show all Devices
            </Button>
        </Drawer>
      </div>
    );
  }
}

CustomDrawer.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CustomDrawer);