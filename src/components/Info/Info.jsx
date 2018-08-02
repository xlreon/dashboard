import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link, Redirect } from 'react-router-dom';
import background from "assets/img/background.png";
import Particles from 'react-particles-js';
import particleConfig from 'assets/particleJson.json';
import Theft from 'components/Theft/Theft.jsx';
import Contact from 'components/Contact/Contact.jsx';

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
  root: {
    flexGrow: 1,
  },
  container : {
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
});    

class Info extends React.Component {


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
            {localStorage.getItem("info") === "theft" ? 
            <Theft />
            :
            <Contact />}
        </div>
      </div>
      </div>
    );
  }
}

Info.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Info);