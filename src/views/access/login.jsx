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
import Particles from 'react-particles-js';
import particleConfig from 'assets/particleJson.json';

const styles = theme => ({
  background : {
    height : '100vh',
    width : '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat : 'no-repeat',
    backgroundSize : '100% 100%',
    zIndex : 0,
    display: 'flex',
    justifyContent : 'center',
    alignItems : 'center',
  },
  particle : {
    zIndex : 1,
    position: "absolute",
    height: "100vh",
    minWidth: "100%",
    color : "#ff0000"
  },
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
  }
});    

class LoginForm extends React.Component {

  state = {
    isEmail: false,
    isPass: false,
  };

  login = () => {
    console.log("cliked")
  };

  forgot = () => {
    console.log("forgot ")
    window.location.href = "/forgot";
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
      // your submit logic
      console.log(this.state.email);
      console.log(this.state.pass);
      
  }

  render() {

    const { classes } = this.props;
    const { email, pass } = this.state;

    return (
      <div className={classes.background}>

      <Particles 
        className={classes.particle}
        params={particleConfig}
        />
      <div className={classes.root}>
        
        <div className={classes.container}>
        {/* <Center> */}
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
                  <Button 
                    size="small" 
                    color='secondary' 
                    onClick={() => this.forgot()}
                  >
                    Forgot Password?
                  </Button>
              </div>
                <div className={classNames('row',classes.login)} >
                {this.state.isEmail && this.state.isPass
                  ?
                  <Button type="submit" variant='raised' color='primary'>Login</Button>
                  :
                  <Button disabled type="submit" variant='raised' color='primary'>Login</Button>}
                </div>
              </ValidatorForm>

              
            </CardContent>
          </Card>
        {/* </Center> */}
        </div>
      </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);