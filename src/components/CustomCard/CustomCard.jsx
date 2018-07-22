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
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

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

function MediaControlCard(props) {
  const { classes, theme } = props;

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
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Android" />
            </ListItem>
            <ListItem >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="99% Battery" />
            </ListItem>
            <ListItem >
              <ListItemIcon>
                <DraftsIcon />
              </ListItemIcon>
              <ListItemText primary="Wifi Network" />
            </ListItem>
          </List>
        </Grid>
      </Grid>

    </div>
  );
}

MediaControlCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MediaControlCard);