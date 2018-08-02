

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
import Dialog from 'components/Dialogs/Dialog.jsx';
import Succesful from 'components/Dialogs/updateSuccessful';

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
      loginButton : {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // backgroundImage: `url(${background})`,
        // backgroundSize : '100% 100%',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      }
});     

class ForgotCard extends React.Component {

    state = {
        user: {},
        check: {},
        open: false,
        success: false,
    };
    
    handleOpenDialog = () => {
        this.setState({ open: true });
    };
    
    handleCloseDialog = () => {
        this.setState({ open: false });
    };

    handleRedirect = () => {
        this.setState({ redirect: true });
    };
    
    
    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
        if (email.length > 0)
            this.setState({ isEmail : true });
        else
            this.setState({ isEmail : false });
    }
    
    handleSubmit = () => {

        var email = localStorage.getItem("resetEmail");

                
        var body = { email: email, password : this.state.user.password};

        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        axios.post(`http://localhost:8080/password/update`, 
            formBody
        )
        .then(res => {
            console.log(res.data);
            if (res.data.status === 9) {
                
                console.log("update successfull")
                this.setState({ success : true});
                
            }
        })
        .catch(error => console.log(error))

        this.setState({ open: false });
        
    }

    handleChange = (event) => {
        const { user,check } = this.state;
        const name = event.target.name;
        const val = event.target.value;
        user[name] = val;
        if (val.length > 0)
            check[name] = true;
        else
            check[name] = false;
        this.setState({ user,check });

        // console.log(user, check)
    }


    componentDidMount() {
        // custom rule will have name 'isPasswordMatch'
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.user.password) {
                return false;
            }
            return true;
        });
    }

    render() {

        
        if (this.state.redirect) {
            return <Redirect push to="/login" />;
        }
        
        const { classes } = this.props;
        const { user, check } = this.state;
    

        return (
            <div>
                <Card className={classes.card}>
                    <CardContent className={classes.content}>

                    <div className={classes.container}>
                        <img src={logo} alt="logo" className={classes.img} />
                    </div>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleOpenDialog}
                        onError={errors => console.log(errors)}
                        >
                        <div className='row'>
                        <TextValidator
                            label="Password"
                            onChange={this.handleChange}
                            name="password"
                            type="password"
                            className={classes.space}
                            validators={['required']}
                            errorMessages={['this field is required']}
                            value={user.password}
                        />
                        </div>
                        <div className='row'>
                        <TextValidator
                            label="Repeat password"
                            onChange={this.handleChange}
                            name="repeatPassword"
                            type="password"
                            className={classes.space}
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['password mismatch', 'this field is required']}
                            value={user.repeatPassword}
                        />
                        </div>
                        <div className={classNames('row',classes.login)} >
                            <Button 
                                disabled={!this.state.check.password ||
                                    !this.state.check.repeatPassword || 
                                    this.state.user.repeatPassword !== this.state.user.password} 
                                type="submit" 
                                variant='raised' 
                                color='primary'
                            >
                                Submit
                            </Button>
                        </div>
                    </ValidatorForm>
                    
                    </CardContent>
                </Card>
                <Dialog 
                    open ={this.state.open}
                    handleSubmit={this.handleSubmit}
                    handleCloseDialog={this.handleCloseDialog}
                />
                <Succesful 
                    open ={this.state.success}
                    handleRedirect={this.handleRedirect}
                />
            </div>
        );
    }
}

ForgotCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ForgotCard);        
        
        