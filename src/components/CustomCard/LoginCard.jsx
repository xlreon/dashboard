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
import Error from '@material-ui/icons/ErrorOutline';

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

class LoginCard extends React.Component {

    state = {
        isEmail: false,
        isPass: false,
        loading : false,
      };
    
      login = () => {
        console.log("cliked")
      };
    
      forgot = () => {
        console.log("forgot ")
        // window.location.href = "/forgot";
      };
    
    
    handleEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });
        if (email.length > 0)
            this.setState({ isEmail : true });
        else
            this.setState({ isEmail : false });
    }
    
    handlePass = (event) => {
        const pass = event.target.value;
        this.setState({ pass });
        if (pass.length > 0)
            this.setState({ isPass : true });
        else
            this.setState({ isPass : false });
    }
    
    handleSubmit = () => {
        console.log(this.state.email);
        console.log(this.state.pass);

        var body = { email: this.state.email, password : this.state.pass};
        
        var formBody = [];
        for (var property in body) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        axios.post(`http://localhost:8080/loginWeb`, 
            formBody
        )
        .then(res => {
            if (res.data.status === 3) {
                console.log("login success")
                localStorage.setItem("email", this.state.email);
                // this.setState({redirect: true});
                if (!this.state.loading) {
                    this.setState(
                      {
                        loading: true,
                      },
                      () => {
                        this.timer = setTimeout(() => {
                          this.setState({
                            loading: false,
                            redirect: true
                          });
                        }, 2000);
                      },
                    );
                }
                // window.location.href = "/forgot";
            }
            else 
            {
                if (!this.state.loading) {
                    this.setState(
                      {
                        loading: true,
                      },
                      () => {
                        this.timer = setTimeout(() => {
                          this.setState({
                            loading: false,
                            invalid : true
                          });
                        }, 2000);
                      },
                    );
                }
            }
        })
        .catch(error => console.log(error))

        
    }

    render() {

        if (this.state.redirect) {
            return <Redirect push to="/selectDevice" />;
        }

        const { classes } = this.props;
        const { email, pass,loading } = this.state;
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
                    <div className='row'>
                    <TextValidator
                        label="Password"
                        onChange={this.handlePass}
                        name="password"
                        type="password"
                        validators={['required']}
                        className={classes.space}
                        errorMessages={['this field is required']}
                        value={pass}
                        />
                    </div>
                    <div className={classNames('row',classes.forgot)} >
                    <Link to='/forgot'>
                    <Button 
                        size="small" 
                        color='primary' 
                        onClick={() => this.forgot()}
                    >
                        Forgot Password?
                    </Button>
                    </Link>
                </div>
                <div className={classNames('row',classes.login)} >
                    {!loading ?
                    <Button disabled={!this.state.isEmail && !this.state.isPass} type="submit" variant='raised' color='primary'>Login</Button>
                    : <CircularProgress size={24} className={classes.buttonProgress} />}

                </div>
                <div className={classNames(classes.login)} >
                    
                    {this.state.invalid ? <Typography color='error'>Invalid Email Address or Password </Typography> : <div></div>}
                </div>
                </ValidatorForm>

                
                </CardContent>
            </Card>
                
            </div>
        );
    }
}

LoginCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginCard);        
        
        