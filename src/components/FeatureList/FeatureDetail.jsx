import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, IconButton } from '../../../node_modules/@material-ui/core';
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.jsx";
import Button from '@material-ui/core/Button';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    root: {
        width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    detailHeader : {
        display: 'flex',
        paddingTop : '8px',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    detailButton : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingBottom : '10px',
        paddingTop : '10px',
    },
    grid : {
        paddingTop : 20,
        paddingBottom : 20,
    },
});     

class FeatureDetail extends React.Component {

    state = {
        open: false,
        message: null,
    };
    
    handleClick = (msg) => {
        this.setState({ open: true, message : msg });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    featureAPI = (feature) => {

        if (feature === "location")
        {
            this.props.changeLocation(this.props.location);
        }

        var body = { featureName : feature};

        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/feature`, 
            formBody
        )
        .then(res => {
            this.handleClick(feature + " API call : Success");
            console.log(res);
        })
        .catch(error => {
            this.handleClick(feature + " API call : Failure");
            console.log(error);
        })
    };

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.state.message}</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                    />
                <Grid container spacing={24} className={classes.grid}>
                    <Grid item xs={2}>
                        <IconButton onClick={this.props.closePanel}>
                            <ChevronLeft />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <div className={classes.detailHeader}>
                            <Typography variant="headline">{this.props.feature.name}</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subheading" color="textSecondary">{this.props.feature.detail}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <GridItem xs={10}>
                        <div className={classes.detailButton}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.button} 
                                onClick={() => {
                                    this.featureAPI(this.props.feature.api);
                                    
                                    
                                }}
                            >
                                {this.props.feature.event}
                            </Button>
                        </div>
                    </GridItem>
                </Grid>
                
            </div>
        );
    }
}

FeatureDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureDetail);