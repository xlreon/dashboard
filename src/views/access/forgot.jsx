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

  send = () => {
    console.log("cliked")
  };

  render() {

    const { classes } = this.props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <div className={classes.container}>
      <center>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <form  noValidate autoComplete="off">
            <div className='row'>
              <TextField
                required
                id="name"
                label="Email"
                className={classes.textField}
                margin="normal"
              />
            </div>
            <div className={classNames('row',classes.login)} >
                <Button size="large" color='primary' variant='raised' onClick={() => this.send()}>Send Verification</Button>
            </div>
            </form>
          </CardContent>
        </Card>
      </center>
      </div>
    );
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);