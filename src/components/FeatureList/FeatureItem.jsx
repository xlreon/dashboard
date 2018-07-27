import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForward from '@material-ui/icons/KeyboardArrowRight';
import { Typography, Divider } from '../../../node_modules/@material-ui/core';
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import List from '@material-ui/core/List';
import DraftsIcon from '@material-ui/icons/Drafts';

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


function FeatureItem(props) {
    const { classes } = props;
    return (
        <div>
            <Divider />
            <ListItem button className={classes.ListItem} onClick={() => {props.openPanel(props.feature)}}>
                <Grid container spacing={24}>
                    <GridItem xs={2}>
                        <ListItemIcon>
                            {props.feature.icon}
                        </ListItemIcon>
                    </GridItem>
                    <GridItem xs={8}>
                        <ListItemText primary={props.feature.name}  />
                    </GridItem>
                    <GridItem xs={2}>
                        <ListItemIcon>
                            <ArrowForward />
                        </ListItemIcon>
                    </GridItem>
                    <GridItem xs={2}>
                    </GridItem>
                    <GridItem xs={10}>
                        <ListItemIcon>
                            <Typography variant="subheading" color="textSecondary">{props.feature.description}</Typography>
                        </ListItemIcon>
                    </GridItem>
                </Grid>
            </ListItem>
            
        </div>
    );
}

FeatureItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureItem);