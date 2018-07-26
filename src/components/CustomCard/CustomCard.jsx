import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import img from "assets/img/android.png";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Wifi from '@material-ui/icons/Wifi';
import Android from '@material-ui/icons/Android';
import IOS from '@material-ui/icons/PhoneIphone';
import Battery from '@material-ui/icons/Battery60';

const styles = theme => ({
  cover: {
    width: 100,
    height: 100,
  },
  root: {
    flexGrow: 1,
  },
  gridItem : { 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function checkOS(os) {
  console.log(os);
  return <Android />;
}

function CustomCard(props) {
  const { classes, theme } = props;
  const os = props.details.os;

  return (
    <div className={classes.root}>

      <Grid container spacing={24}>
        <Grid item xs={3} className={classes.gridItem}>
        {/* <Typography variant="subheading" color="textSecondary"> */}
              <img src={img} className={classes.cover} />
            {/* </Typography> */}
        </Grid>
        <Grid item xs={9}>
          <List component="nav">
            <ListItem >
              <ListItemIcon>
              <Android />
              </ListItemIcon>
              <ListItemText primary={props.details.name} />
            </ListItem>
            <ListItem >
              <ListItemIcon>
                <Battery />
              </ListItemIcon>
              <ListItemText primary={props.details.battery + "% Battery"} />
            </ListItem>
            <ListItem >
              <ListItemIcon>
                <Wifi />
              </ListItemIcon>
              <ListItemText primary={props.details.wifi} />
            </ListItem>
          </List>
        </Grid>
      </Grid>

    </div>
  );
}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomCard);