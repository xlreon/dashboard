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

const styles = theme => ({
    
      card: {
        minWidth: 275,
        zIndex : 2,
        position : 'relative',
        borderRadius: '25px'
      },
      content : {
        marginRight : 30,
        marginLeft : 30
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
        // marginRight : 10,
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
      }
});     

class Contact extends React.Component {

    state = {

    };
    
    componentDidMount() {

        // var body = { imei: prop};
            
        //     var formBody = [];
        //         for (var property in body) {
        //         var encodedKey = encodeURIComponent(property);
        //         var encodedValue = encodeURIComponent(body[property]);
        //         formBody.push(encodedKey + "=" + encodedValue);
        //         }
        //         formBody = formBody.join("&");
                
        //         axios.post(`http://localhost:8080/phone/get`, 
        //         formBody
        //         )
        //         .then(res => {
        //         if (res.data.body.content !== null) {
        //             phoneList.push(res.data.body);
        //             this.setState({phones: phoneList});
        //             localStorage.setItem("phones",JSON.stringify(phoneList));
        //             localStorage.setItem('prevHash',md5(JSON.stringify(res.data.body)))
        //             console.log(localStorage.getItem('prevHash'))
        //             // console.log(this.state.phones)
        //         }
        //         })
        //         .catch(error => console.log(error))
    }

    render() {
        
        const { classes } = this.props;
        const { email, pass,loading } = this.state;
        const image = <Grid xs={3} className={classes.container}><img src={img} className={classes.img}/></Grid>;
        return (
            <div>
                <Card className={classes.card}>
                <CardContent className={classes.content}>

                    

                
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
        
        