

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import AvailDevice from 'components/AvailDevice/AvailDevice';
import Grid from '@material-ui/core/Grid';
import PhoneIcon from '@material-ui/icons/PhonelinkLock';
import classNames from "classnames";
import Divider  from '@material-ui/core/Divider';
import md5 from 'md5';
import Hidden from "@material-ui/core/Hidden";

const styles = theme => ({
    
      card: {
        minWidth: 275,
        zIndex : 2,
        position : 'relative',
        borderRadius: '25px',
        width: '70%'
      },
      content : {
        // marginRight : 10,
        // marginLeft : 10
      },
      root: {
        flexGrow: 1,
      },
      container : {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
      },
      header : {
          margin : 20,
      },
      title :{
        marginTop : 10,
        marginBottom : 10,
      },
      icon : {
        width: 80,
        height: 80,
        // marginTop : 20,
        // marginRight : 20,
    },
});     

class SelectDevice extends React.Component {

    state = {
        phones: [],
    };

    headers = {"headers": {'Access-Control-Allow-Origin': '*'}}

    componentDidMount() {

        const email = localStorage.getItem("email")
        
        if (email)
        {
            var body = { email : email};
            
            var formBody = [];
            for (var property in body) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            axios.post(`http://localhost:8080/imei/get`, 
                formBody,
                this.headers
            )
            .then(res => {
            var imeiList = res.data.body.content;
        
            var phoneList = [];
            
            // console.log(imeiList)
            {imeiList.map((prop, key) => {
            
            var body = { imei: prop};
            
            var formBody = [];
                for (var property in body) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(body[property]);
                formBody.push(encodedKey + "=" + encodedValue);
                }
                formBody = formBody.join("&");
                
                axios.post(`http://localhost:8080/phone/get`, 
                    formBody,
                    this.headers
                )
                .then(res => {
                if (res.data.body.content !== null) {

                    phoneList.push(res.data.body);
                    this.setState({phones: phoneList});

                    localStorage.setItem("phones",JSON.stringify(phoneList));
                    localStorage.setItem('prevHash'+key,md5(JSON.stringify(res.data.body)))
                    // console.log('hash'+key,localStorage.getItem('prevHash'+key))

                }
                })
                .catch(error => console.log(error))
        
            })}
            
            })
            .catch(error => console.log(error))
        
        }
    
    }

    handleClick = (phone) => {
        
        localStorage.setItem("currPhone",JSON.stringify(phone));

        localStorage.setItem('initialLoc',JSON.stringify(this.state.phones[phone].data));

        this.setState({redirect :true});
    };

    render() {        

        const { classes } = this.props;
        const { phones } = this.state;

        if (this.state.redirect) {
            return <Redirect push to="/dashboard" />;
        }

        return (
            <div className={classes.container}>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>
                        <Hidden smDown implementation="css">
                            <Grid container spacing={24}>
                                <Grid item xs={10}>
                                    <div className={classNames('row',classes.header)} >
                                        <div>
                                            <Typography variant='title' className={classes.title}>Select a Phone or tablet</Typography>
                                        </div>
                                        <div>
                                            <Typography variant='subheading'>Then try some simple steps, like showing the location or locking the screen, to help you secure it. For your security, you may need to sign in after selecting a device.
                                            </Typography>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <PhoneIcon className={classes.icon}/>
                                </Grid>
                            </Grid>
                            <List component="nav">
                                {phones.map((prop, key) => {
                                    return <AvailDevice phone={prop} id={key} key={key} handleClick={this.handleClick}/>;
                                })}
                                
                            </List>
                        </Hidden>
                        <Hidden mdUp implementation="css">
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <div className={classNames('row',classes.header)} >
                                        <div>
                                            <Typography variant='title' className={classes.title}>Select a Phone or tablet</Typography>
                                        </div>
                                        <div>
                                            <Typography variant='subheading'>Then try some simple steps, like showing the location or locking the screen, to help you secure it. For your security, you may need to sign in after selecting a device.
                                            </Typography>
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} className={classes.container}>
                                    <PhoneIcon className={classes.icon}/>
                                </Grid>
                            </Grid>
                            <List component="nav">
                                {phones.map((prop, key) => {
                                    return <AvailDevice phone={prop} id={key} key={key} handleClick={this.handleClick}/>;
                                })}
                                
                            </List>
                        </Hidden>
                    </CardContent>
                </Card>
                
            </div>
        );
    }
}

SelectDevice.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SelectDevice);        
        
        