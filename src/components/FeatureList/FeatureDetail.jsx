import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForward from '@material-ui/icons/KeyboardArrowRight';
import { Typography, IconButton } from '../../../node_modules/@material-ui/core';
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    detailHeader : {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-start',
    },
    detailButton : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    grid : {
        paddingTop : 20,
        paddingBottom : 20,
    },
});     

function FeatureDetail(props) {
    const { classes } = props;
    return (
        <div>
            <Grid container spacing={24} className={classes.grid}>
                <GridItem xs={2}>
                    <IconButton onClick={props.closePanel}>
                        <ChevronLeft />
                    </IconButton>
                </GridItem>
                <GridItem xs={10} className={classes.detailHeader}>
                    <Typography variant="headline">{props.feature}</Typography>
                </GridItem>
                <GridItem xs={12}>
                    <Typography variant="subheading" color="textSecondary">{props.featureDetail}</Typography>
                </GridItem>
                <GridItem xs={12} className={classes.detailButton}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Stop Ringing
                    </Button>
                </GridItem>
            </Grid>
            
        </div>
    );
}

FeatureDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureDetail);