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
import UpdatePassCard from 'components/CustomCard/UpdatePassCard';

const styles = theme => ({
  background : {
    height : '100vh',
    width : '100%',
    backgroundImage: `url(${background})`,
    backgroundRepeat : 'no-repeat',
    backgroundSize : '100% 100%',
    overflow : 'hidden',
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


  render() {

    const { classes } = this.props;

    return (
      <div className={classes.background}>

        {/* <Particles 
        className={classes.particle}
        params={particleConfig}
        /> */}
      <div className={classes.root}>
        
        <div className={classes.container}>
          <UpdatePassCard />
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