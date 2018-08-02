import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Typography } from '../../../node_modules/@material-ui/core';
import logo from "assets/img/pfa.png";
import { withStyles } from '@material-ui/core/styles';

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const styles = theme => ({
    
  image : {
    marginBottom : 20,
    marginTop : 20,
    height : '100%',
    width : '100%'
  },
  dialog : {
    flexGrow : 1
  }
});

class AlertDialogSlide extends React.Component {


  render() {

    const {classes ,image} = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.props.onClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className={classes.dialog}
        >
            <img src={image} className={classes.image}/>
        </Dialog>
      </div>
    );
  }
}

AlertDialogSlide.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlertDialogSlide);