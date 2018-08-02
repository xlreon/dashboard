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
import { Link, Redirect } from 'react-router-dom';
import LockPhone from 'components/LockPhone/LockPhone';
import Dialog from 'components/Dialogs/Dialog.jsx';
import Authentication from 'components/Dialogs/authentication.jsx';
import { Switch } from 'antd';
import 'antd/dist/antd.css';

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
        authentication : false,
        pass : null
    };

    componentDidMount() {
        this.setState({ event : this.props.feature.event});
    }
    
    handleClick = (msg) => {
        this.setState({ open: true, message : msg });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmitDialog = () => {
        this.setState({ authentication: false, checkID : true });
    };
    
    handleCloseDialog = () => {
        this.setState({ authentication: false });
    };

    handleCloseAuth = () => {
        this.setState({ checkID: false });
    };

    handlePassChange =  event => {
        this.setState({
          pass : event.target.value,
        });
    };

    headers = {"headers": {'Access-Control-Allow-Origin': '*'}}

    handlePassSubmit = () => {

        var email = localStorage.getItem("email");
        var pass = this.state.pass;

        // console.log(email, pass);

        var body = { email: email, password : pass};
        
        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/loginWeb`, 
            formBody,
            this.headers
        )
        .then(res => {
            if (res.data.status === 3) {

                this.callFeature('wipe');
                this.handleCloseAuth();
            }
            else
            {
                this.setState({invalid : true});
            }
        })
        .catch(error => console.log(error))

        
    };

    featureAPI = (feature) => {

        if (feature === "location")
        {
            this.props.changeLocation(this.props.location);
        }

        if (feature === "theft")
        {
            localStorage.setItem("info","theft");
            this.setState({theft : true});
        }

        if (feature === "contact")
        {
            localStorage.setItem("info","contact");
            this.setState({contact : true});
        }


        if (this.state.event === "Switch On")
        {
            this.setState({event: "Switch Off"});
            feature = "alarmOn";
        }
        else if (this.state.event === "Switch Off")
        {
            this.setState({event: "Switch On"});
            feature = "alarmOff";
        }
        else if (this.state.event === "Prevent SwitchOff")
        {
            this.setState({event: "Allow SwitchOff"});
            feature = "preventOn";
        }
        else if (this.state.event === "Allow SwitchOff")
        {
            this.setState({event: "Prevent SwitchOff"});
            feature = "preventOff";
        }

        this.callFeature(feature);

    };

    callFeature(feature) {

        var imei = localStorage.getItem('imeiList');
        var imeiList = imei.split(",");

        var body = { featureName : feature, imei : imeiList[this.props.currentPhone]};

        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        axios.post(`http://ec2-18-216-27-235.us-east-2.compute.amazonaws.com:8080/feature`, 
            formBody,
            this.headers
        )
        .then(res => {
            this.handleClick(feature + " API call : Success");
            console.log(res);
        })
        .catch(error => {
            this.handleClick(feature + " API call : Failure");
            console.log(error);
        })
    }

    render() {

        if (this.state.theft)
            return <Redirect push to="/info" />;
        if (this.state.contact)
            return <Redirect push to="/info" />;

        const { classes, currentPhone } = this.props;
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
                        {this.props.feature.detail === "noDetail" ?
                        <LockPhone currentPhone={currentPhone}/>
                        :
                        <Typography variant="subheading" color="textSecondary">{this.props.feature.detail}</Typography>
                        }
                    </Grid>
                    <Grid item xs={2}>
                    </Grid>
                    <GridItem xs={10}>
                    {this.props.feature.detail === "noDetail" ?
                        <div></div>
                        :
                        <div className={classes.detailButton}>
                                {console.log(this.props.feature.api)}
                            {
                            this.props.feature.api !== "theft" && this.props.feature.api !== "contact" && this.props.feature.api !== "wipe"
                            ?
                            <Switch className={classes.button} checkedChildren="On" unCheckedChildren="Off"
                                onClick={() => {
                                    if (this.props.feature.api === "wipe")
                                    {
                                        this.setState({authentication : true})
                                    }
                                    else
                                        this.featureAPI(this.props.feature.api);
                                }}/>
                            :
                            <Button 
                                variant="contained" 
                                color="primary" 
                                className={classes.button} 
                                onClick={() => {
                                    if (this.props.feature.api === "wipe")
                                    {
                                        this.setState({authentication : true})
                                    }
                                    else
                                        this.featureAPI(this.props.feature.api);
                                }}
                            >
                                {this.state.event}
                            </Button>
                        }
                        </div>
                    }
                    </GridItem>
                </Grid>

                <Dialog 
                    open ={this.state.authentication}
                    text={"All data will be permanently erased from this device. After your device has been erased, you can’t locate it. If your device is offline, erasing will begin when it next comes online. To erase your device, you may need to sign in again."}
                    handleSubmit={this.handleSubmitDialog}
                    handleCloseDialog={this.handleCloseDialog}
                />
                <Authentication 
                    open={this.state.checkID}
                    onClose={this.handleCloseAuth}
                    pass={this.state.pass}
                    handlePassChange={this.handlePassChange}
                    handlePassSubmit={this.handlePassSubmit}
                    invalid={this.state.invalid}
                />
            </div>
        );
    }
}

FeatureDetail.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeatureDetail);