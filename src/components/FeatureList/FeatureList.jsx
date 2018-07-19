import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import ArrowForward from '@material-ui/icons/KeyboardArrowRight';
import { Typography } from '../../../node_modules/@material-ui/core';
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  ListItem : {
      paddingTop : 20,
      paddingBottom : 20,
  },
});

function SimpleList(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button className={classes.ListItem}>
            <Grid container spacing={24}>
                <GridItem xs={2}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                </GridItem>
                <GridItem xs={8}>
                    <ListItemText primary="Play Sound"  />
                </GridItem>
                <GridItem xs={2}>
                    <ListItemIcon>
                        <ArrowForward />
                    </ListItemIcon>
                </GridItem>
                <GridItem xs={12}>
                    <ListItemIcon>
                        <Typography variant="subheading" color="textSecondary">dbsvijdsbvjsbdoivdsoivndsvndo oioifenoifnseoifnesoi dfnbiodf</Typography>
                    </ListItemIcon>
                </GridItem>
            </Grid>
        </ListItem>
        <Divider />
        <ListItem button className={classes.ListItem}>
            <Grid container spacing={24}>
                <GridItem xs={2}>
                    <ListItemIcon>
                        <DraftsIcon />
                    </ListItemIcon>
                </GridItem>
                <GridItem xs={8}>
                    <ListItemText primary="Secure Device"  />
                </GridItem>
                <GridItem xs={2}>
                    <ListItemIcon>
                        <ArrowForward />
                    </ListItemIcon>
                </GridItem>
                <GridItem xs={12}>
                    <ListItemIcon>
                        <Typography variant="subheading" color="textSecondary">dbsvijdsbvjsbdoivdsoivndsvndo oioifenoifnseoifnesoi dfnbiodf</Typography>
                    </ListItemIcon>
                </GridItem>
            </Grid>
        </ListItem>
      </List>
      
    </div>
  );
}

SimpleList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleList);