

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
import { Link, Redirect } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';

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
        marginBottom : 20,
        marginTop : 20,
      },
});     

class ForgotCard extends React.Component {

    state = {
        isEmail: false,
        loading : false,
      };
    
    
    
    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
        if (email.length > 0)
            this.setState({ isEmail : true });
        else
            this.setState({ isEmail : false });
    }
  
    headers = {"headers": {'Access-Control-Allow-Origin': '*'}}
    
    handleSubmit = () => {
        

        var body = { email: this.state.email};
        
        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        axios.post(`http://ec2-18-219-197-132.us-east-2.compute.amazonaws.com:8080/forgetPassword`, 
            formBody,
            this.headers
        )
        .then(res => {
            console.log(res.data);
            if (res.data.status === 1) {
                console.log(" success")
                localStorage.setItem("resetEmail",this.state.email);

                if (!this.state.loading) {
                    this.setState(
                      {
                        loading: true,
                      },
                      () => {
                        this.timer = setTimeout(() => {
                          this.setState({
                            loading: false,
                            sent: true
                          });
                        }, 2000);
                      },
                    );
                }
            }
        })
        .catch(error => console.log(error))

        localStorage.setItem("resetEmail",this.state.email);
        
    }

    render() {


        const { classes } = this.props;
        const { email, loading } = this.state;

        console.log(loading)
        return (
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>

                    <div className={classes.container}>
                        <img src={logo} alt="logo" className={classes.img} />
                    </div>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                        >
                        <div className='row'>
                        <TextValidator
                            label="Email"
                            onChange={this.handleEmail}
                            name="email"
                            value={email}
                            className={classes.space}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}
                            />
                        </div>
                        <div className={classNames('row',classes.login)} >
                            {!loading ?
                            <Button disabled={!this.state.isEmail} type="submit" variant='raised' color='primary'>Send Verification</Button>
                            : <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </ValidatorForm>
                    <div className={classNames(classes.login)} >
                      {this.state.sent ? <Typography color='default'>Verification Mail sent to your Email </Typography> : <div></div>}
                    </div>
                    </CardContent>
                </Card>
                
            </div>
        );
    }
}

ForgotCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotCard);        
        
        