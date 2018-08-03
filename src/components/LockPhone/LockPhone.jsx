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
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

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
        width : '90%',
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

class LockPhone extends React.Component {

    state = {
        open: false,
        message: null,
        lock : {}
      };

    
    
    handleSubmit = (event) => {
        // console.log(this.state.lock["password"] , this.state.lock["note"], this.state.lock["phone"])

        var imei = localStorage.getItem('imeiList');
        var imeiList = imei.split(",");

        // console.log(imeiList[this.props.currentPhone])

        var body = { 
          imei : imeiList[this.props.currentPhone],
          password : this.state.lock["password"],
          message : this.state.lock["note"],
          phone : this.state.lock["phone"]
        };

        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        var headers = {"headers": {'Access-Control-Allow-Origin': '*'}}

        axios.post(`http://ec2-18-220-150-205.us-east-2.compute.amazonaws.com:8080/feature/setRemotePassword`, 
            formBody,
            headers
        )
        .then(res => {
            this.handleClick("Set Remote Password API call : Success");
            console.log(res);
        })
        .catch(error => {
            this.handleClick("Set Remote Password API call : Failure");
            console.log(error);
        })
    }

    handleChange = (event) => {

        const { lock } = this.state;
        const name = event.target.name;
        const val = event.target.value;
        lock[name]=val;
        this.setState({ lock });

        // console.log(user, check)
    }

    handleClick = (msg) => {
        this.setState({ open: true, message : msg });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    

    render() {
        const {classes} = this.props;
        const { phone, note, password } = this.state;
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
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                    >
                    <div className='row'>
                        <TextValidator
                            label="Set a Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            value={password}
                            className={classes.space}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                    <div className='row'>
                        <TextValidator
                            label="Write a note to the finder"
                            onChange={this.handleChange}
                            name="note"
                            value={note}
                            className={classes.space}
                        />
                    </div>
                    <div className='row'>
                        <TextValidator
                            label="Give a phone number for the finder to call"
                            onChange={this.handleChange}
                            name="phone"
                            value={phone}
                            className={classes.space}
                            validators={['required']}
                            errorMessages={['this field is required']}
                        />
                    </div>
                </ValidatorForm>

                <div className={classNames('row',classes.login)} >
                    <Button onClick={() => this.handleSubmit()} type="submit" variant='raised' color='primary'>Submit</Button>

                </div>
                
            </div>
        );
    }
}

LockPhone.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LockPhone);        
        
        