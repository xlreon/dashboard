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

const styles = theme => ({
  card: {
    minWidth: 275,
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
    justifyContent : 'flex-end',
    marginTop : 30
  },
  forgot : {
    display: 'flex',
    justifyContent : 'flex-end',
    marginTop : 10
  },
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
  }

  render() {

    const { classes } = this.props;
    const { email, pass } = this.state;

    return (
      <div className={classes.container}>
        <Card className={classes.card}>
          <CardContent className={classes.content}>

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
              {this.state.isEmail && this.state.isPass
                ?
                <Button type="submit" variant='raised' color='primary'>Submit</Button>
                :
                <Button disabled type="submit" variant='raised' color='primary'>Submit</Button>}
              </div>
            </ValidatorForm>

            <div className={classNames('row',classes.forgot)} >
                <Button 
                  size="small" 
                  color='secondary' 
                  onClick={() => this.forgot()}
                  
                >
                  Forgot Password?
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);