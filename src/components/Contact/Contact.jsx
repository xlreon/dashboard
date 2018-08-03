import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import classNames from "classnames";
import TextField from '@material-ui/core/TextField';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Center from 'react-center';
import logo from "assets/img/pfa.png";
import background from "assets/img/background.png";
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Error from '@material-ui/icons/ErrorOutline';
import img from "assets/img/android.png";
import Grid from '@material-ui/core/Grid';
import SimpleSelect from '../SimpleSelect/SimpleSelect';
import { Divider } from '../../../node_modules/@material-ui/core';
import "video-react/dist/video-react.css";
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import IconButton from "@material-ui/core/IconButton";
import { Spin } from 'antd'
import 'antd/dist/antd.css';

const styles = theme => ({
    
      card: {
        minWidth: 275,
        zIndex : 2,
        position : 'relative',
        borderRadius: '25px'
      },
      content : {
        // marginRight : 30,
        // marginLeft : 30
      },
      bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        marginBottom: 16,
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 250,
      },
      root: {
        flexGrow: 1,
      },
      container : {
        display: 'flex',
        justifyContent : 'center',
        alignItems : 'center',
      },
      right : {
        display: 'flex',
        justifyContent : 'flex-end',
      },
      space : {
        width : 250,
        marginBottom : 10
      },
      login : {
        display: 'flex',
        justifyContent : 'center',
        marginTop : 30
      },
      forgot : {
        display: 'flex',
        justifyContent : 'flex-end',
        // marginTop : 10
      },
      img : {
        height : 100,
        width : 100,
        },
      loginButton : {
        // background: 'linear-gradient(45deg, #9480ff 30%, #fffff0 90%)',
        background: '#9480ff',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
      contact : {
        margin : 10
      }

});     

class Contact extends React.Component {
    headers = {"headers": {'Access-Control-Allow-Origin': '*'}}
  
    componentDidMount() {
      
        var phones = localStorage.getItem("phones")
        this.setState({phones : JSON.parse(phones)});
        var imei = localStorage.getItem('imeiList');
        var email = localStorage.getItem('email');

        var imeiList = imei.split(",");

        var body = { imei: imeiList[this.state.currentPhone], email : email, type : 'text'};
            
        var formBody = [];
            for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        axios.post(`http://ec2-18-219-197-132.us-east-2.compute.amazonaws.com:8080/file/db/get`, 
          formBody,
          this.headers
        )
        .then(res => {
            console.log(res.data)
            if (res.data.body.content !== null) {

                this.setState({contact : res.data.body.content })

                this.state.contact.sort((a,b)=>{
                  var timeA = a.name.split('-');
                  var timeB = b.name.split('-');

                  return parseInt(timeB[0]) - parseInt(timeA[0]) 
                  // console.log(parseInt(time[0]))
                });
                
                this.state.contact.map((item)=>{
                  var name = item.name.split('-');
                  item.newName = name[1];
                  console.log(name[1])
                });

                this.setState({contact : this.state.contact})
            }
            else 
            {
              this.setState({contact : []})
            }
        })
        .catch(error => console.log(error))

    }
    
    state = {
        anchorEl : null,
        currentPhone : 0,
        contact : null,
    }

    handleClose = () => {
      this.setState({ anchorEl: null });
    };
    
    deviceSelect = event => {
        this.setState({ anchorEl: event.currentTarget });
        // console.log(event.currentTarget)
        console.log(this.state.anchorEl)
    };

    handleChange = (event) => {
        this.setState({currentPhone: event.target.value !== undefined ? event.target.value : 0,anchorEl : null})
    }

    render() {
        
        const { classes } = this.props;
        const { phones, currentPhone, anchorEl, contact } = this.state;
        
        console.log(contact)

        return (
            <div>
                <Card className={classes.card}>
                <CardContent className={classes.content}>
                <Grid container spacing={24}>
                    <Grid xs={2} item>
                      <IconButton onClick={() => {window.history.back();}}>
                            <ChevronLeft />
                        </IconButton>
                    </Grid>
                    <Grid xs={10} item className={classes.container}>
                      <SimpleSelect
                          className={classes.appSelectPhone}
                          phones={phones} 
                          device={currentPhone}
                          handleChange={this.handleChange}
                          deviceSelect={this.deviceSelect}
                          anchorEl={anchorEl}
                          currentPhone={currentPhone}
                          handleClose={this.handleClose}
                      />
                    </Grid>
                  </Grid>
                  <Typography variant="title" className={classes.contact} color='primary'>Contacts :</Typography>
                    {/* <Grid container spacing={24}> */}
                      {contact !== null ?
                      <div>
                        {contact.length === 0 ? <Typography color="error" className={classes.container}>No contacts found!</Typography>: ""}
                        {contact.map((item) => {
                          return <div className={classNames('row',classes.contact)} >
                            <a href={item.location}>
                            <Button 
                              variant="raised"
                              size="large"
                            >
                            {item.newName}
                            </Button></a>
                          </div>;
                        })}
                      </div>
                      // : <Typography color="error" className={classes.container}>Fetching data...</Typography>}
                      : <Spin size="large" />}

                
                </CardContent>
            </Card>
                
            </div>
        );
    }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Contact);        
        
        