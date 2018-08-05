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
import Info from '@material-ui/icons/InfoOutline';
import Battery from '@material-ui/icons/Battery60';
import  IconButton  from '@material-ui/core/IconButton';
import Dialog from 'components/Dialogs/Imei';

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
  },
  block : {
    display : 'block',
    marginTop : 15
  }
});

class CustomCard extends React.Component {

  state = {
    imei : false,
  }

handleCloseDialog = () => {
  this.setState({ imei: false });
};

componentDidMount() {
  
    var imei = localStorage.getItem('imeiList');
      
    var imeiList = imei.split(",");

    this.setState({imeiVal : imeiList[this.props.currentPhone]});


}

render() {
  const { classes, theme } = this.props;

  return (
    <div className={classes.root}>

      <Grid container spacing={24}>
        <Grid item xs={3} className={classes.block}>

            <div className={classes.gridItem}>
              <img src={img} className={classes.cover} />
            </div>
            <div className={classes.gridItem}>

              <IconButton onClick={() => this.setState({imei : true})}>
                <Info />
              </IconButton>
            </div>

        </Grid>
        <Grid item xs={9}>
          <List component="nav">
            <ListItem >
              <ListItemIcon>
              <Android />
              </ListItemIcon>
              <ListItemText primary={this.props.details.brand + " " + this.props.details.model} />
            </ListItem>
            <ListItem >
              <ListItemIcon>
                <Battery />
              </ListItemIcon>
              <ListItemText primary={this.props.details.battery + "% Battery"} />
            </ListItem>
            <ListItem >
              <ListItemIcon>
                <Wifi />
              </ListItemIcon>
              <ListItemText primary={this.props.details.ssid} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Dialog 
        open ={this.state.imei}
        text={this.state.imeiVal}
        handleCloseDialog={this.handleCloseDialog}
      />
    </div>
  );
}

}

CustomCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(CustomCard);